"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EventRecord } from "@/lib/content";
import { gisFeatures, gisLayers, gisSources, gisTimeline, type Coordinate, type GisFeature, type GisGeometry, type GisLayerId } from "@/lib/historical-gis";

const W = 1200;
const H = 850;
const bounds = { minLon: -100, maxLon: -60, minLat: 9, maxLat: 51 };
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const defaultLayers: GisLayerId[] = ["campaigns","blockade","privateering","freedom","logistics","boundaries","territory","survivals"];
const project = ([lon, lat]: Coordinate) => ({ x: ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * W, y: ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * H });
const unproject = (x: number, y: number): Coordinate => [bounds.minLon + (x / W) * (bounds.maxLon - bounds.minLon), bounds.maxLat - (y / H) * (bounds.maxLat - bounds.minLat)];
const linePath = (coords: Coordinate[]) => coords.map((coord, index) => { const point = project(coord); return `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`; }).join(" ");
const geometryPath = (geometry: GisGeometry) => geometry.type === "Point" ? "" : geometry.type === "LineString" ? linePath(geometry.coordinates) : `${linePath(geometry.coordinates[0])} Z`;
const coordinatesOf = (geometry: GisGeometry): Coordinate[] => geometry.type === "Point" ? [geometry.coordinates] : geometry.type === "LineString" ? geometry.coordinates : geometry.coordinates[0];
const centerOf = (geometry: GisGeometry): Coordinate => { const coords = coordinatesOf(geometry); return [coords.reduce((sum, item) => sum + item[0], 0) / coords.length, coords.reduce((sum, item) => sum + item[1], 0) / coords.length]; };
const eventDate = (event: EventRecord) => {
  const month = Math.max(0, months.findIndex((value) => event.date.includes(value))) + 1;
  const day = Number(event.date.match(/^\d{1,2}/)?.[0]) || 1;
  return `${event.year}-${String(month || 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
};
const dateLabel = (value: string) => { const [year, month, day] = value.split("-").map(Number); return `${months[month - 1].slice(0,3)} ${day}, ${year}`; };
const statusAt = (feature: GisFeature, date: string) => date < feature.properties.start ? "future" : date > feature.properties.end ? "past" : "current";

const land: Coordinate[][] = [
  [[-100,49],[-95,49],[-92,48],[-89,48],[-85,47],[-82,45],[-79,44],[-76,45],[-73,46],[-69,47],[-66,45],[-67,43],[-70,42],[-72,41],[-74,40],[-75,38],[-76,36],[-78,34],[-80,32],[-81,29],[-80,26],[-82,25],[-84,29],[-87,30],[-89,29],[-92,29],[-94,29],[-97,27],[-100,29],[-100,49]],
  [[-85,23.5],[-82,22],[-79,21],[-75,20],[-74,21],[-78,22.5],[-82,23.5],[-85,23.5]],
  [[-74,19.8],[-71,19],[-68,18.3],[-69,17.6],[-72,18],[-74,19.8]],
  [[-85,11.5],[-82,9],[-78,8.5],[-77,9.5],[-80,11],[-83,12.5],[-85,11.5]],
];
const lakes: Coordinate[][] = [
  [[-92.1,47.9],[-89.6,46.5],[-87.7,46.4],[-86.5,47.7],[-88.3,48.8],[-91,48.7],[-92.1,47.9]],
  [[-87.1,45.8],[-86.1,43.1],[-87,41.7],[-88.1,42.4],[-88.6,44.5],[-87.1,45.8]],
  [[-84.8,45.9],[-82.4,43],[-81.7,42.2],[-83.1,42],[-84.9,44.2],[-84.8,45.9]],
  [[-83.2,42.2],[-79,42],[-78.7,42.8],[-81.2,42.9],[-83.2,42.2]],
  [[-79.8,43.3],[-76.1,43.4],[-76,44.1],[-78.5,44],[-79.8,43.3]],
];

const presets: { label: string; description: string; layers: GisLayerId[] }[] = [
  { label: "Continental war", description: "Campaigns, blockade, supply, and territorial consequence", layers: ["campaigns","blockade","logistics","boundaries","territory","survivals"] },
  { label: "Indigenous geographies", description: "Homelands, coalition war, cession, and imposed borders", layers: ["homelands","campaigns","boundaries","territory"] },
  { label: "Black freedom", description: "Flight, British sea power, refugee diaspora, and surviving places", layers: ["freedom","blockade","shorelines","survivals"] },
  { label: "Water and supply", description: "Shipyards, lake corridors, blockade, and privateering", layers: ["logistics","blockade","privateering","shorelines"] },
];

export function MapExplorer({ events }: { events: EventRecord[] }) {
  const [timeIndex, setTimeIndex] = useState(7);
  const [visibleLayers, setVisibleLayers] = useState<Set<GisLayerId>>(new Set(defaultLayers));
  const [selectedFeatureId, setSelectedFeatureId] = useState("baltimore-campaign");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [showEvents, setShowEvents] = useState(true);
  const [inspectMode, setInspectMode] = useState(false);
  const [inspection, setInspection] = useState<{ coordinate: Coordinate; nearby: GisFeature[] } | null>(null);
  const currentDate = gisTimeline[timeIndex].date;
  const selectedFeature = gisFeatures.find((item) => item.id === selectedFeatureId);
  const selectedEvent = events.find((item) => item.id === selectedEventId);
  const layerMap = useMemo(() => new Map(gisLayers.map((item) => [item.id, item])), []);
  const drawable = gisFeatures.filter((item) => visibleLayers.has(item.properties.layer) && statusAt(item, currentDate) !== "future");
  const visibleEvents = events.filter((event) => eventDate(event) <= currentDate && event.longitude >= bounds.minLon && event.longitude <= bounds.maxLon && event.latitude >= bounds.minLat && event.latitude <= bounds.maxLat);

  const toggleLayer = (id: GisLayerId) => setVisibleLayers((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const selectFeature = (id: string) => { setSelectedFeatureId(id); setSelectedEventId(""); };
  const applyPreset = (layers: GisLayerId[]) => { setVisibleLayers(new Set(layers)); setInspection(null); };
  const inspect = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!inspectMode) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const coordinate = unproject(((event.clientX - rect.left) / rect.width) * W, ((event.clientY - rect.top) / rect.height) * H);
    const nearby = drawable.map((item) => ({ item, distance: Math.hypot(centerOf(item.geometry)[0] - coordinate[0], (centerOf(item.geometry)[1] - coordinate[1]) * .7) })).sort((a,b) => a.distance - b.distance).slice(0,4).map(({ item }) => item);
    setInspection({ coordinate, nearby });
  };

  return <div className="gis-explorer">
    <section className="gis-presets" aria-label="Curated map views">
      {presets.map((preset) => <button key={preset.label} onClick={() => applyPreset(preset.layers)}><strong>{preset.label}</strong><span>{preset.description}</span></button>)}
    </section>

    <div className="gis-workbench">
      <aside className="gis-layer-panel">
        <div className="gis-panel-heading"><p className="section-kicker">Layer register</p><h2>Choose the evidence</h2><p>Overlaps are intentional. The same ground can be a homeland, a military corridor, and an escape route.</p></div>
        <div className="gis-layer-list">
          {gisLayers.map((layer) => <label key={layer.id} className={visibleLayers.has(layer.id) ? "active" : ""}>
            <input type="checkbox" checked={visibleLayers.has(layer.id)} onChange={() => toggleLayer(layer.id)} />
            <i style={{ "--layer-color": layer.color } as React.CSSProperties} />
            <span><strong>{layer.label}</strong><small>{layer.short}</small></span>
            <b>{gisFeatures.filter((item) => item.properties.layer === layer.id).length}</b>
          </label>)}
        </div>
        <div className="gis-layer-actions"><button onClick={() => setVisibleLayers(new Set(gisLayers.map((item) => item.id)))}>Show all</button><button onClick={() => setVisibleLayers(new Set())}>Clear</button></div>
        <label className="gis-event-toggle"><input type="checkbox" checked={showEvents} onChange={(event) => setShowEvents(event.target.checked)} /><span><strong>Event records</strong><small>Coordinate-backed points already in the site</small></span></label>
      </aside>

      <div className="gis-map-column">
        <div className="gis-timebar">
          <div><span>{dateLabel(currentDate)}</span><strong>{gisTimeline[timeIndex].label}</strong></div>
          <label><span>Move through the war and settlement</span><input aria-label="Historical date" type="range" min="0" max={gisTimeline.length - 1} value={timeIndex} onChange={(event) => setTimeIndex(Number(event.target.value))} /></label>
          <button className={inspectMode ? "active" : ""} onClick={() => { setInspectMode((value) => !value); setInspection(null); }}>{inspectMode ? "Exit inspection" : "What was here then?"}</button>
        </div>

        <div className={`gis-map ${inspectMode ? "inspecting" : ""}`}>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="gis-title gis-desc" onClick={inspect}>
            <title id="gis-title">{`Historical GIS of the War of 1812 at ${dateLabel(currentDate)}`}</title>
            <desc id="gis-desc">An editorial map of dated campaign routes, naval zones, Indigenous homelands, freedom-seeking routes, logistics, political geography, and surviving sites.</desc>
            <rect width={W} height={H} className="gis-water" />
            <g className="gis-graticule">{[-95,-90,-85,-80,-75,-70,-65].map((lon) => { const p=project([lon,30]); return <line key={lon} x1={p.x} x2={p.x} y1="0" y2={H} />; })}{[10,20,30,40,50].map((lat) => { const p=project([-80,lat]); return <line key={lat} x1="0" x2={W} y1={p.y} y2={p.y} />; })}</g>
            <g className="gis-land">{land.map((shape,index) => <path key={index} d={`${linePath(shape)} Z`} />)}</g>
            <g className="gis-lakes">{lakes.map((shape,index) => <path key={index} d={`${linePath(shape)} Z`} />)}</g>
            <g className="gis-basemap-labels"><text x="260" y="150">BRITISH NORTH AMERICA</text><text x="340" y="420">UNITED STATES</text><text x="780" y="570">ATLANTIC OCEAN</text><text x="315" y="765">GULF OF MEXICO</text><text x="945" y="720">CARIBBEAN</text></g>
            <g className="gis-polygons">{drawable.filter((item) => item.geometry.type === "Polygon").map((item) => <path key={item.id} tabIndex={0} role="button" aria-label={item.properties.title} d={geometryPath(item.geometry)} className={`gis-feature gis-${item.properties.layer} confidence-${item.properties.confidence} status-${statusAt(item,currentDate)} ${selectedFeatureId === item.id ? "selected" : ""}`} style={{ "--feature-color": layerMap.get(item.properties.layer)?.color } as React.CSSProperties} onClick={(event) => { event.stopPropagation(); selectFeature(item.id); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") selectFeature(item.id); }}><title>{item.properties.title}</title></path>)}</g>
            <g className="gis-lines">{drawable.filter((item) => item.geometry.type === "LineString").map((item) => <g key={item.id} className={`status-${statusAt(item,currentDate)}`}><path d={geometryPath(item.geometry)} className="gis-line-hit" onClick={(event) => { event.stopPropagation(); selectFeature(item.id); }} /><path tabIndex={0} role="button" aria-label={item.properties.title} d={geometryPath(item.geometry)} className={`gis-feature gis-${item.properties.layer} confidence-${item.properties.confidence} ${selectedFeatureId === item.id ? "selected" : ""}`} style={{ "--feature-color": layerMap.get(item.properties.layer)?.color } as React.CSSProperties} onClick={(event) => { event.stopPropagation(); selectFeature(item.id); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") selectFeature(item.id); }}><title>{item.properties.title}</title></path></g>)}</g>
            <g className="gis-points">{drawable.filter((item) => item.geometry.type === "Point").map((item) => { const point=project(item.geometry.coordinates as Coordinate); return <circle key={item.id} cx={point.x} cy={point.y} r={selectedFeatureId === item.id ? 10 : 6} tabIndex={0} role="button" aria-label={item.properties.title} className={`gis-feature gis-${item.properties.layer} status-${statusAt(item,currentDate)} ${selectedFeatureId === item.id ? "selected" : ""}`} style={{ "--feature-color": layerMap.get(item.properties.layer)?.color } as React.CSSProperties} onClick={(event) => { event.stopPropagation(); selectFeature(item.id); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") selectFeature(item.id); }}><title>{item.properties.title}</title></circle>; })}</g>
            {showEvents && <g className="gis-events">{visibleEvents.map((event) => { const point=project([event.longitude,event.latitude]); return <circle key={event.id} cx={point.x} cy={point.y} r={selectedEventId === event.id ? 7 : 3.5} className={selectedEventId === event.id ? "selected" : ""} tabIndex={0} role="button" aria-label={`${event.date}: ${event.title}`} onClick={(click) => { click.stopPropagation(); setSelectedEventId(event.id); setSelectedFeatureId(""); }} onKeyDown={(key) => { if (key.key === "Enter" || key.key === " ") { setSelectedEventId(event.id); setSelectedFeatureId(""); } }}><title>{`${event.date}: ${event.title}`}</title></circle>; })}</g>}
            {inspection && (() => { const point=project(inspection.coordinate); return <g className="gis-inspection-mark"><circle cx={point.x} cy={point.y} r="17" /><path d={`M${point.x-24},${point.y}H${point.x+24} M${point.x},${point.y-24}V${point.y+24}`} /></g>; })()}
          </svg>
          <div className="gis-scale"><span /><b>approximately 500 km</b></div>
          {inspectMode && !inspection && <p className="gis-click-prompt">Select a location to retrieve its nearest historical layers.</p>}
        </div>
        <p className="gis-map-caution"><strong>Editorial GIS, not a legal or navigational map.</strong> Dashed geometry carries lower confidence; faded geometry represents activity completed by the selected date. Select any feature for its method and sources.</p>
      </div>
    </div>

    {inspection ? <section className="gis-inspection">
      <header><p className="section-kicker">What was here then?</p><h2>{Math.abs(inspection.coordinate[1]).toFixed(2)}°{inspection.coordinate[1] >= 0 ? "N" : "S"}, {Math.abs(inspection.coordinate[0]).toFixed(2)}°W</h2><p>The nearest mapped evidence—not a claim that every polygon occupied this exact point.</p></header>
      <div>{inspection.nearby.map((item) => <button key={item.id} onClick={() => { selectFeature(item.id); setInspection(null); }}><span style={{ "--layer-color": layerMap.get(item.properties.layer)?.color } as React.CSSProperties} /><small>{layerMap.get(item.properties.layer)?.label}</small><strong>{item.properties.title}</strong><p>{item.properties.then ?? item.properties.summary}</p></button>)}</div>
    </section> : selectedFeature ? <FeatureRecord feature={selectedFeature} /> : selectedEvent ? <EventRecordCard event={selectedEvent} /> : null}

    <section className="gis-method">
      <div><p className="section-kicker">How to read this map</p><h2>Uncertainty is part of the record.</h2></div>
      <div><p>Military routes are corridors, not GPS tracks. Blockade polygons describe changing operational pressure, not walls at sea. Homeland regions overlap because lived Indigenous geographies were not nineteenth-century state polygons. Freedom-seeking lines join documented origins and destinations while refusing to invent an unknowable footstep-by-footstep path.</p><p>Every feature therefore carries a date range, precision class, confidence judgment, construction note, and source trail. That apparatus is available here and in the downloadable GeoJSON.</p><a className="primary-action" href="/data/historical-gis.geojson" download>Download the historical GIS <span>↓</span></a></div>
    </section>

    <section className="gis-source-register">
      <header><p className="section-kicker">Spatial bibliography</p><h2>Sources behind the layers</h2><p>The map favors public archives and public-history institutions. A link supports an interpretation; it does not magically turn a generalized geometry into a surveyed fact.</p></header>
      <div>{gisSources.map((source,index) => <article key={source.id}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{source.title}</h3><p>{source.institution}</p><small>{source.note}</small></div><a href={source.url} target="_blank" rel="noreferrer">Open source ↗</a></article>)}</div>
    </section>
  </div>;
}

function FeatureRecord({ feature }: { feature: GisFeature }) {
  const layer = gisLayers.find((item) => item.id === feature.properties.layer)!;
  const sources = gisSources.filter((source) => feature.properties.sourceIds.includes(source.id));
  return <article className="gis-record" style={{ "--record-color": layer.color } as React.CSSProperties}>
    <header><p className="section-kicker">Selected spatial record</p><span>{layer.label}</span><h2>{feature.properties.title}</h2><p>{feature.properties.summary}</p></header>
    <dl><div><dt>Active dates</dt><dd>{dateLabel(feature.properties.start)}–{dateLabel(feature.properties.end)}</dd></div><div><dt>Confidence</dt><dd>{feature.properties.confidence}</dd></div><div><dt>Precision</dt><dd>{feature.properties.precision}</dd></div><div><dt>Geometry</dt><dd>{feature.geometry.type}</dd></div></dl>
    {(feature.properties.then || feature.properties.now) && <div className="gis-then-now"><div><small>Then</small><p>{feature.properties.then ?? feature.properties.summary}</p></div><div><small>Now</small><p>{feature.properties.now ?? "Read the modern overlay cautiously; survival and commemoration are not the same thing."}</p></div></div>}
    <div className="gis-record-method"><div><h3>Construction note</h3><p>{feature.properties.method}</p></div><div><h3>Provenance</h3>{sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><strong>{source.title}</strong><span>{source.institution} ↗</span></a>)}</div></div>
  </article>;
}

function EventRecordCard({ event }: { event: EventRecord }) {
  return <article className="gis-record gis-event-record"><header><p className="section-kicker">Selected event record</p><span>{event.theater} · {event.type}</span><h2>{event.title}</h2><p>{event.summary}</p></header><dl><div><dt>Date</dt><dd>{event.date}</dd></div><div><dt>Place</dt><dd>{event.place}</dd></div><div><dt>Coordinate</dt><dd>{event.coordinatePrecision}</dd></div><div><dt>Record</dt><dd><Link href={`/events/${event.id}`}>Open full event →</Link></dd></div></dl></article>;
}
