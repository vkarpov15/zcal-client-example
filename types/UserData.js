import Archetype from 'archetype';
import GeoJSONPointFeatureType from './GeoJSONPointFeature';
import assert from 'assert';

export const EventType = new Archetype({
  date: {
    $type: Date,
    $validate: v => assert.ok(!isNaN(v.valueOf()), 'Invalid date!')
  },
  name: { $type: 'string' },
  location: { $type: GeoJSONPointFeatureType }
}).compile('EventType');

export default new Archetype({
  name: {
    $type: 'string'
  },
  events: {
    $type: [EventType],
    $default: []
  }
}).compile('UserDataType');
