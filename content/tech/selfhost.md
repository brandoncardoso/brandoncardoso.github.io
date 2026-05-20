---
tags: []
title: Selfhost
---

## Apps

* [radarr](https://github.com/Radarr/Radarr) - movie organization/manager
* [sonarr](https://github.com/Sonarr/Sonarr) - show/series organization/manager
* [bazarr](https://github.com/morpheus65535/bazarr) - subtitle manager for radarr and sonarr
* [prowlarr](https://github.com/Prowlarr/Prowlarr) - indexer manager
* [flaresolverr](https://github.com/FlareSolverr/FlareSolverr) - proxy server to bypass cloudflare
* [jellyfin](https://github.com/jellyfin/jellyfin) - media system backend and web api
* [seerr](https://github.com/seerr-team/seerr) - media request and discovery manager
* [autobrr](https://github.com/autobrr/autobrr) - download automation
* [profilarr](https://github.com/Dictionarry-Hub/Profilarr/) - manage quality configs for radarr & sonarr


## PT

```mermaid
flowchart LR
subgraph pt
    Int(("`\* **Int.** \*`"))
    Int --> OPS
    Int --> RED
    Int --> MaM

    MaM["`**MaM**
1tb, 2r, 6mo
`"]
    MaM --> ANT
    MaM --> BBT
    MaM --> SP
    MaM --> LST
    MaM -.->|maybe?| ATH
    MaM -->|9mo| BLU

    BLU["`**BLU**
1- 20tb^, .4r, 3mo
2- 5tb#, .4r, 1m, >1m avg
`"]
    BLU --> LST

    LST["`**LST**
24tb^/6tb#, 1r, 10u, 4m, >1mo avg
`"]
    LST -->|lev/ship, 1y| ATH

    SP["`**SP**
*sp* - 1tb, 1r, 6mo
`"]
    SP --> LST

    ATH["`**ATH**
*pr* - 10tb, 1r, 5u, 8mo, >50d avg
*ti* - 100tb, 2r, 20u, 2y, >6m avg
`"]
    ATH -->|pr+| OE & ANT & SP & HUNO
    ATH -->|ti+, 200u| PTP & HDB
    ATH -->|oc+, 1yr| GGn

    GGn -->|eg, 6mo| AB
    GGn -->|mg, 1y| PTP

    HDB["`**HDB**
1- 1y, 2fa>1mo
2- 30gbv, .95r, 4wk
`"]
    HDB -->|2y| PTP
    HDB --> GGn
    HDB --> AB
    HDB --> OPS
    HDB --> OCD
    HDB --> BIB
    HDB --> BHD

    ANT["`**ANT**
*pu* - 1tb, 1r, 5u/10a, 25kbp
*fu* - 2tb, 1.5r, 5u + 20u/50a, 3mo, 100kbp
`"]
    ANT -->|fu| OPS

    OPS["`**OPS**
*eu* - 100gb, 1.05r, 50u, 4wk
`"]
    OPS -->|3mo| GGn
    OPS -->|3mo| RED
    OPS -->|tm+, 2y| PTP
    OPS -->|tm+, 18mo| BHD

    RED["`**RED**
*pu* - 25gb, .65r, 5u, 2wk
*eu* - 100gb, .65r, 50u, 4wk
*tm* - 500gb, 0.65r, 500u, 8wk
`"]
    RED -->|tm+, 1y| BTN
    RED -->|tm+, 18mo| BHD

    BTN["`**BTN**`"]

    KG
end

subgraph AZ net
    AZ["`**AZ**
*mem* - 300gb, 2r, 4mo, 10kbp
`"]
    AZ --> AnZ
    AZ --> PHD

end


style Int stroke:#b0b,stroke-width:4px;

classDef acq stroke:#0b0,stroke-width:4px;
class MaM,AZ acq;

classDef open stroke:#0bb,stroke-width:4px;
class SP,HUNO open;

classDef eg stroke:#c00,stroke-width:4px;
class PTP,AB,BTN eg;
```

