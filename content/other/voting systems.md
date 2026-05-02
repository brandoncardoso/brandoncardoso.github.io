---
tags: []
title: Voting Systems
---

## Positional/Rank Voting

* voting systems that uses voters' ranking by order of preference to determine single or multiple winners from candidates/options
* Ranked Choice Voting (RCV) systems where candidates receive points based on their rank/position in each ballot, highest points wins
    * e.g. 3 points for 1st choice/position, 2 points for 2nd, 1 for 3rd
* varying weights/points assigned to each position by different positional voting systems, which can heavily affect the final rank ordering of candidates

### Instant-runoff voting

* ranked-vote voting method that recursively eliminates the plurality loser until one candidate has majority of remaining votes

### Borda count

* classic positional voting system
* N candidates
* 1st position candidate each on ballet gets N points, 2nd gets N-1, ..., Nth position gets 1 point
* any uniform difference in points has same result

### Top-heavy

* systems for assigning points with more focus on how many voters consider a candidate a "favourite" (highly ranked)

#### Plurality voting

* plurality -- choose one
* first-preference plurality (first-past-the-post) systems only let voters select one candidate and most votes wins, even without a majority
* the 1st choice receives 1 point and all other candidates receive 0
* the most top-heavy positional voting system

#### Geometric

* points follow a mathematical sequence or geometric progression
    * e.g. 1st choice gets 1 point, 2nd gets 1/2 points, 3rd gets 1/4, 1/8, 1/16, etc.

#### Eurovision Song Contest

* uses system where 1st choice gets 12 points, 2nd 10 points, 8, 7, 6, 5, 4, 3, 2, 1, remaining get 0


## Cardinal voting

* voting systems that allow voters to define their strength of support for a candidate
* each candidate gets a separate score

### Score/Range voting

* voters give each candidate a numeric score, highest average score wins
    * e.g. score each candidate from 0 (worst) to 9 (best)

#### Approval voting

* simplest scoring method where votes approve (+1) any number of candidates, most votes wins
    * Latvia uses modified version where voters can give positive (+1), negative (-1), or 0 to any number of candidates

### STAR

* Score Then Automatic Runoff
* hybrid of score and ranked voting
    * voters score each candidate from 0 (worst) to 5 (best)
    * 2 highest total candidates become finalists
    * finalist with higher preference across all voters wins

## Condorcet/Round-robin voting

* every pair of candidates is 1-on-1 compared by total number of voters that prefer each candidate in a "beats" matrix
    * lit. record which candidates beat each other candidate in 1-on-1
* majority-preferred (Condorcet) candidate is elected, if one exists
    * Condorcet winner - candidate that beats all other candidates in a 1-on-1
* if no Condorcet winner, candidate closest to being Condorcet wins, based on record in beats matrix
    * different methods exist to define "closest"

---

<figure>
  <img src="/images/single-winner-voting-method-comparison.png" alt="Single-Winner Voting Method Scorecard" />
  <figcaption>
    <cite>equal.vote/ranked_robin</cite>
  </figcaption>
</figure>

## Links
* https://rangevoting.org
* [Ranked voting (Wikipedia)](https://en.wikipedia.org/wiki/Ranked_voting)
* [Comparison of electoral systems (Wikipedia)](https://en.wikipedia.org/wiki/Comparison_of_electoral_systems)
* [Cordorcet method (wikipedia)](https://en.wikipedia.org/wiki/Condorcet_method)
