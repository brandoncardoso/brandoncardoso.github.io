---
tags: []
title: Atomic Models
---

* representations of [[atom|atoms]] to help visualize atomic structure, and explain/predict the behaviour of atoms
* every model sacrifices some accuracy for simplicity, visibility, or usability

<figure>
  <img src="/images/atom-models.svg" alt="Atom models" class="img-bg-light" style="max-width: 600px;"/>
  <figcaption><cite>Khan Academy, CC BY-NC-SA 3.0</cite></figcaption>
</figure>


## The Bohr model

<figure>
  <img src="/images/bohr-model.svg" alt="Bohr model of various atoms" class="img-bg-light" style="max-width: 500px;"/>
  <figcaption>
    Bohr model of various atoms.
    <cite>Khan Academy, CC BY-NC-SA 3.0</cite>
  </figcaption>
</figure>

* represents electrons as particles that occupy specific, quantized energy levels
* electrons are represented as black dots that sit on a ring around the nucleus
* nucleus is a single circle in the center
* not meant to represent what real atoms look like


### Strengths

* represents the _particle_ nature of electrons, easy to see the number of electrons in an atom
* electrons exist at specific energy levels, Bohr model represents these as rings
  * electrons on the same ring are at the same energy level


### Weaknesses

* does not reflect the _wave_ properties of electrons
  * electrons appear to exist in specific locations, which is not entirely true
* nucleus is shown as single circle, no distinct protons/neutrons
* because it treats electrons as having fixed orbits, it can not accurately predict the [[atomic spectra]] for more complex atoms with more than one electron

### How are electrons arranged?

* the first energy level (closest to the nucleus) holds a maximum of two electrons
* the second energy level holds a maximum of eight electrons
* electrons are paired in twos, this represents the filling of _orbitals_
  * each energy level has different orbitals, and each orbital can hold two electrons
* any unpaired electron is always in the outermost energy level
  * for main group elements [^mainGroupElements], lower energy levels fill completely before electrons are placed into the next level

[^mainGroupElements]: ==TODO== -- what are main group elements?


### Energy levels

* the rings in a Bohr model represent discrete energy levels that electrons can occupy
* electrons can not exist at energies between levels
* also called **shells**, and are labeled $n=1, n=2, n=3$ starting from the nucleus
  * the higher the shell number, the greater the energy of electrons in that shell
* the shells represent electrons' energy levels, **NOT** their position or path
  * electrons do not move in circular paths around the nucleus
* sometimes, Bohr models may show rings that get closer together as the shell number increases
  * represents how the difference between energy levels decreases with greater $n$
  * exact spacing of the rings is not important
* maximum number of electrons per shell is determined by the formula: $\text{max \# of electrons} = 2 \cdot n^2$
* electrons in the outermost shell are called [[valence electron|valence electrons]]

| Shell | Max electrons |
|-------|---------------|
| $n=1$ | 2             |
| $n=2$ | 8             |
| $n=3$ | 18            |
| $n=4$ | 32            |
| ...   | ...           |


## The de Broglie model

<figure style="max-width: 250px">
  <img src="/images/de-broglie-model.jpg" alt="the de Broglie atomic model"/>
  <figcaption><cite>Larry Sulak, Boston U.</cite></figcaption>
</figure>

* electrons are represented as a physical standing wave around the nucleus
* higher energy levels show wave patterns with more segments, like a vibration string
* does not handle the particle behaviour of electrons


## The electron cloud model

<figure>
  <img src="/images/helium-atom-electron-cloud.png" alt="Electron cloud model of a helium atom" class="img-bg-light" style="max-width: 200px;"/>
  <figcaption><cite>"Helium atom QM" by Yzmo, CC BY-SA 3.0</cite></figcaption>
</figure>


* also called the **quantum mechanical model**, and sometimes the **Schrödinger model**
* expanded on de Broglie's wave model to mathematically describe electron behaviour
* instead of electrons being at fixed positions, it predicts the probability distribution for where electrons are likely to be found
* the nucleus is a group of individual red protons and purple neutrons
* regions around the nucleus, **orbitals**, show the probability of finding an electron
* electron transitions are represented as transitions from one harmonic to another in the wave function
* [Schrödinger equation](https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation), wave function
$$$
\displaystyle\large i\hbar\frac{\delta}{\delta t}\rvert\Psi\rangle = \hat{H}\rvert\Psi\rangle
$$$


### Strengths

* represents the _wave_ and _particle_ behaviour of electrons
  * fuzzy electron cloud represents how individual electrons are distributed in the atom
  * until we measure the position of an electron, we don't know exactly where it is, the best we can do is describe where they are likely to be found around the nucleus
* how the nucleus is represented
  * individual protons and neutrons
  * very small compared to the size of the electron cloud
    * real nucleus would be invisible if properly scaled in this model


### Weaknesses

* does not represent the _particle_ nature of electrons
  * can't tell how many electrons an atom has

