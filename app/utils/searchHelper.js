import compact from 'lodash/compact';

export function unitToAddress(province, district, ward) {
  const units = [ward, district, province];
  const result = compact(units).map(item => item.name);
  return result.join(', ');
}
