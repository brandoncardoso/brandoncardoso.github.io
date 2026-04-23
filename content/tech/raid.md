---
title: RAID
tags: []
---

* Redundant Array of Independent Disks
* data is distributed across multiple storage drives to improve performance and/or prevent data loss


## Techniques

### Striping
* data blocks are distributed across multiple disks
* improves read/write speed by parallelizing operations
* does not provide redundancy or fault tolerance


### Mirroring
* data blocks are written fully to multiple disks for redundancy
* significant storage overhead


### Parity
* parity is used to check data integrity
* when data is written, the RAID controller calculates parity using XOR and stores parity blocks across the disks alongside the regular data blocks
* negatively affects write speed, has to read old data & parity, calculate new parity, then write new data and parity
* ex)
  ```
  Disk A: 1 0 1 1
  Disk B: 0 1 0 1
  Parity = A XOR B = 1 1 1 0
  ```

  if Disk B fails: `Recovered B = A XOR Parity = 0 1 0 1`

## RAID Levels

| Level                      | Min. Drives | Capacity | Tolerance   | Read        | Write | Best for                          |
|----------------------------|------------:|---------:|-------------|-------------|-------|-----------------------------------|
| RAID 0 - Striping          |           2 |     100% | 0 drives    | 5/5         | 5/5   | speed-critical, temp data         |
| RAID 1 - Mirroring         |           2 |      50% | 1 drive     | 4/5         | 3/5   | 2-4 drives, critical data         |
| RAID 5 - Single Parity     |           3 |   67-87% | 1 drive     | 4/5         | 3/5   | $\leq$8TB drives, general NAS     |
| RAID 6 - Dual Parity       |           4 |   50-83% | 2 drives    | 4/5         | 2/5   | $\gt$8TB drives, mission-critical |
| RAID 10 - Mirrored Stripes |           4 |      50% | 1 per pair  | 5/5         | 4/5   | DBs, VMs, high I/O                |
| RAID 50 - Striped RAID 5   |           6 |   67-83% | 1 per group | 5/5         | 4/5   | Large arrays, performance         |
| RAID 60 - Striped RAID 6   |           8 | 50-75%      | 2 per group | 5/5   | 3/5                               | Enterprise, max safety |


## Links

* [RAID Calculator](https://raidcalculator.net) - calculate performance/cost of different RAID configurations
