# Should I go out now?

Covid-19 has subsided in some places, but how should people behave? During the height of the pandemic it was clear how you should behave - stay at home if you can and shelter in place. Now, as things improve, it's difficult to know how best to behave.

We've seen friends and family making decisions based on intuition or fatigue of the restrictions on their normal lifestyle.

We don't think there has been enough discussion about how to behave based on the real risks that exist today. We hope that other, smarter people, begin to build models to help the public make decisions on how to behave.

## Transmission

Even now, there is a lot we don't know about Covid-19 transmission. Putting absolute probabilities on transmission rates in various environments is impossible to get right.

[This model](/) accounts for the following transmission methods:

- Droplet spread (worse indoors, worse within 2 meters or less)

- Aerosol spread (especially in poorly ventilated indoor areas / transport, possibly can travel more than 2 meters)

This model does not account for the following transmission methods:

- Surface spread (Fomite), via hands which later touch face

Although surface spread seems possible, it seems less probable (this is echoed by the CDC \[1\])

## Exposure

If you ignore surface spread, you cannot catch Covid without another human who is infected with Covid-19 being present.

Tests, althought not perfect, let us sample populations at random to find what % of people currently have Covid-19. It's important to use test data that is a sample of the entire population, and not just people who submit themselves to be tested because they feel sick.

The % of people in a population with Covid-19 varies significantly by country and region within country.

This model calculates the probability of being exposed to Covid-19 by ...

[\[1\] https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html](https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html)

[\[2\] https://www.npr.org/sections/goatsandsoda/2020/07/06/887919633/](https://www.npr.org/sections/goatsandsoda/2020/07/06/887919633/)
