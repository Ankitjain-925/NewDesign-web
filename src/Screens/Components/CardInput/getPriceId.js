export function getPriceId(type) {
  let env = "DEV";
  let url = "";
  if (typeof window !== "undefined") {
    let target = window.location.href;
    env = target.match(/aidoc.io|localhost/) ? "DEV" : "PRD";
  }
  if (env === "DEV") {
    let price = type == "Doc Around The Clock" ? "price_1IiFBiH4UyTD79BwHpJf72tD" : "price_1IiFEJH4UyTD79BwEEdzAZe1"
    console.log('price1', price)
    return price;
  } else {
    let price = type == "Doc Around The Clock" ? "price_1IiFBnH4UyTD79Bw5bl9Iu6o" : "price_1IiFEsH4UyTD79BwpNveERog"
    console.log('price2', price)
    return price;
  }
}
