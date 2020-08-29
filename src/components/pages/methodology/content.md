# Should I go out now?

Covid-19 has subsided in some places, but how should people behave? During the height of the pandemic it was clear how you should behave - stay at home if you can and shelter in place. Now, as things improve, it's difficult to know how best to behave.

We've seen friends and family making decisions based on intuition or fatigue of the restrictions on their normal lifestyle.

We don't think there has been enough discussion about how to behave based on the real risks that exist today. We hope that other, smarter people, begin to build models to help the public make decisions on how to behave.

_Disclaimer_: we're not statistians or epidemilogists.

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

Tests, although not perfect, let us sample populations at random to find what % of people currently have Covid-19. It's important to use test data that is a random sample a population, and not just people who submit themselves to be tested because they feel sick.

The % of people in a population with Covid-19 varies significantly by country and region within country.

## Modal methodology

This project is [open source on github](https://github.com/shouldigooutnow/shouldigooutnow/blob/master/src/model/index.js).

Model inputs:

```
probabilitySomeoneInPopulationHasCovid

probabilityOfTransmissionPerHourDoingActivity
```

Our model uses Binomial mass function \[3\].

```
f(attempts, successes, probability)

e.g The probability of flipping a coin 6 times and getting 4 heads:

f(6, 4, 0.5)
```

### Calculating the probability someone present during an activity has Covid

To calculate probability someone present during an activity has covid we use the function as follows:

```
probabilityNobodyPresentHasCovid = f(numberOfPeoplePresent, 0, probabilitySomeoneInPopulationHasCovid)
probabilitySomebodyPresentHasCovid = 1 - probabilityNobodyPresentHasCovid
```

This relies on the `probabilitySomeoneInPopulationHasCovid` being accurate, we allow you to modify this input on the website.

### Calculating the probability some transmits Covid to you

#### Assumptions

We make the assumption that you'll only be exposed to a single person at a time. Since the probability of being exposed is currently quite low and even in a large crowd of say 2000, you're unlikely to be exposed to all the people in that crowd.

#### Method

We first convert `probabilityOfTransmissionPerHourDoingActivity` to minutes using: `1 - Math.pow(1 - hourlyTransmissionProbability, 1 / 60)`

Example:

```
https://math.stackexchange.com/a/153612

prob transmission in 1 hour: 0.1

prob no transmission in 1 hour: 1 - 0.1 = 0.9

prob no transmission in 2 hours: 0.9 * 0.9

prob no transmission in 3 hours: 0.9 * 0.9 * 0.9

prob no transmission in 4 hours: 0.9 ^ 4

prob no transmission in 1/2 an hour: 0.9 ^ (1/2)

prob no transmission in 1/60 of an hour: 0.9^(1/60)
```

Next we use the binomial probability function again to calculate the probability that we contract covid from a single person in a given number of minutes.

```
probDoNotContract = f(eventDurationMins, 0, minutelyTranmissionProbability)
probContract = 1 - probDoNotContract
```

When do `probabilitySomebodyPresentHasCovid * probContract` to find the probability someone preset has covid and infects us.

## Calculating total risk

For each activity we multiply all the risks of somebody with Covid _not_ being present together to find the total probability someone has covid.

```
1 - (probabilitySomebodyPresentDoesNotHaveCovid1 * probabilitySomebodyPresentDoesNotHaveCovid2 * probabilitySomebodyPresentDoesNotHaveCovid3 * ...)
```

We use the same methodology to calculate the total probability of getting infected.

## Contact us

If you'd like to contact us you can reach us on hello@shouldigooutnow.com

[\[1\] https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html](https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html)

[\[2\] https://www.npr.org/sections/goatsandsoda/2020/07/06/887919633/](https://www.npr.org/sections/goatsandsoda/2020/07/06/887919633/)

[\[3\] https://en.wikipedia.org/wiki/Binomial_distribution#Example](https://en.wikipedia.org/wiki/Binomial_distribution#Example)
