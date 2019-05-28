import _ from "lodash"
import rates from "../data/adjusters.csv"


class Adjuster {
    // Returns value as a percentage of nominal GDP
    // Nominal GDP is stored in billions
    static calcGDPRate (val, valYear) {
        const r = _.find(rates, {year: valYear + ""})
        if (!r || !r.nom_gdp) throw "Cannot find nominal GDP for year " + valYear
        return val / (r.nom_gdp * 1000000000)
    }

    // Returns value as per capita
    // Population is stored in millions
    static calcPerCapita (val, valYear) {
        const r = _.find(rates, {year: valYear + ""})
        if (!r || !r.pop) throw "Cannot find population for year " + valYear
        return val / (r.pop * 1000000)
    }

    // Returns inflation adjusted value (i.e. $1000 in 2020 is $857 in 2010 dollars)
    static calcRealVal (val, valYear, baseYear) {
        const b = _.find(rates, {year: baseYear + ""})
        const c = _.find(rates, {year: valYear + ""})
        if (!b || !b.cpi) throw "Cannot find CPI for year " + baseYear
        if (!c || !c.cpi) throw "Cannot find CPI for year " + valYear
        return val * b.cpi / c.cpi
    }
}

export default Adjuster
