export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': ['step', ['get', 'erov'], '#eceece', 1, '#e41a1c',2,'#377eb8',3,'#4daf4a',4,'#984ea3',5,'#ff7f00',6,'#ffff33'],
    'circle-radius': ['interpolate', ['linear'], ['get', 'total_roll'], 1, 4, 100, 14, 200, Math.sqrt(200) + 4],
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};
