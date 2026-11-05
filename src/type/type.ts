export interface Iproduct {
    "id": number,
    "slug": string,
    "nameBn": string,
    "category": string,
    "categoryNameBn": string,
    "categoryIcon": string,
    "unit": string,
    "image": string,
    "today": number,
    "yesterday": number,
    "lastWeek": number,
    "lastMonth": number,
    "change": {
      "dir": string, //up | down | flat
      "pct": number // parcanteg like 2.4
    }
}