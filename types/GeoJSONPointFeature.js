import Archetype from 'archetype';
import assert from 'assert';

const GeoJSONPoint = new Archetype({
  type: {
    $type: 'string',
    $default: 'Point',
    $validate: v => assert.equal(v, 'Point', `${v} !== 'Point'`)
  },
  coordinates: {
    $type: ['number'],
    $default: [],
    $validate: v => assert.equal(v.length, 2, `${v} must have length 2`)
  }
}).compile('GeoJSONPoint');

export default new Archetype({
  type: {
    $type: 'string',
    $default: 'Feature',
    $validate: v => assert.equal(v, 'Feature', `${v} !== 'Feature'`)
  },
  properties: {
    $type: Object,
    $default: {},
    $required: true
  },
  geometry: {
    $type: GeoJSONPoint,
    $required: true
  }
}).compile('GeoJSONPointFeatureType');
