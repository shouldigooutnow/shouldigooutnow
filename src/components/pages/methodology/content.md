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

Not everyone recognizes Aerosol spread, it's still unknown if this is happening. \[1\]

This model does not account for the following transmission methods:

- Surface spread (Fomite), via hands which later touch face

Although surface spread seems possible, it seems less probable (this was echoed by the CDC \[2\])

## Exposure

If you ignore surface spread, you cannot catch Covid without another human who is infected with Covid-19 being present.

Tests, although not perfect, let us sample populations at random to find what % of people currently have Covid-19. It's important to use test data that is a random sample of a population, and not just people who submit themselves to be tested because they feel sick.

The % of people in a population with Covid-19 varies significantly by country and region within country.

## Modal methodology

This project is [open source on github](https://github.com/shouldigooutnow/shouldigooutnow/blob/master/src/model/index.js).

Model inputs:

```
probabilitySomeoneInPopulationHasCovid

probabilityOfTransmissionPerHourDoingActivity
```

Our model uses Binomial probability mass function \[4\].

```
bpmf(attempts, successes, probability)

e.g The probability of flipping a coin 6 times and getting 4 heads:

bpmf(6, 4, 0.5)
```

### Calculating the probability someone present during an activity has Covid

#### Assumptions

The model does **not** assume that some people stay home to self-isolate and are therefore not in the general population.

Each activity assumes those people are a random sample from the population, some activities, e.g. going to an Office, might repeatively expose you to the same people.

#### Methodology

To calculate probability someone present during an activity has covid we use the Binomial probability mass function as follows:

```
probabilityNobodyPresentHasCovid = bpmf(numberOfPeoplePresent, 0, probabilitySomeoneInPopulationHasCovid)
probabilitySomebodyPresentHasCovid = 1 - probabilityNobodyPresentHasCovid
```

This relies on the `probabilitySomeoneInPopulationHasCovid` being accurate, we allow you to modify this input on the website.

### Calculating the probability some transmits Covid to you

#### Assumptions

We make the assumption that you'll only be exposed to a single person at a time. Since the probability of being exposed to multiple people is currently quite low and even in a large crowd of say 2000, you're unlikely to be exposed to all the people in that crowd.

We suggest entering the number of people you'd be exposed to: people nearby, or in the same room.

#### Method

We use exponential decay \[5\] to calculate the probability you contract covid.

[Example](https://math.stackexchange.com/a/153612):

```
prob transmission in 1 hour: 0.1

prob no transmission in 1 hour: 1 - 0.1 = 0.9

prob no transmission in 2 hours: 0.9 * 0.9

prob no transmission in 3 hours: 0.9 * 0.9 * 0.9

prob no transmission in 4 hours: 0.9 ^ 4

prob no transmission in 1/2 an hour: 0.9 ^ (1/2)

prob no transmission in 1/60 of an hour: 0.9 ^ (1/60)

prob no transmission in T minutes: 0.9 ^ (T/60)

prob transmission in T minutes: 1 - (0.9 ^ (T/60))

prob transmission in T minutes: 1 - ((1 - 0.1) ^ (T/60))
```

We then do `probabilitySomebodyPresentHasCovid * probTransmission` to find the probability someone present has covid and transmits it.

## Calculating total risk

For each activity we multiply all the risks of somebody with Covid _not_ being present together to find the total probability someone has covid.

```
1 - (probabilitySomebodyPresentDoesNotHaveCovid1 * probabilitySomebodyPresentDoesNotHaveCovid2 * probabilitySomebodyPresentDoesNotHaveCovid3 * ...)
```

We use the same methodology to calculate the total probability of getting infected.

## Contact us

If you'd like to contact us you can reach us on hello@shouldigooutnow.com

[\[1\] https://www.bmj.com/content/370/bmj.m3206](https://www.bmj.com/content/370/bmj.m3206)

[\[2\] https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html](https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html)

[\[3\] https://www.npr.org/sections/goatsandsoda/2020/07/06/887919633/](https://www.npr.org/sections/goatsandsoda/2020/07/06/887919633/)

[\[4\] https://en.wikipedia.org/wiki/Binomial_distribution#Example](https://en.wikipedia.org/wiki/Binomial_distribution#Example)

[\[5\] https://en.wikipedia.org/wiki/Exponential_decay](https://en.wikipedia.org/wiki/Exponential_decay)
