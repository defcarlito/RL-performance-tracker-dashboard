## Overview

This site displays the data collected by the my [StatExtract](https://github.com/defcarlito/StatExtract) plugin. I have a server that takes in the data from my plugin and uploads it to a database from which this site accesses. 
## Usage

~~Access a live of demo of the size [here]().~~

I am unable to provide link to the live demo of the site at this moment. Instead, view the following gif of me using the app below:

![Demo of site](/public/ex/demo.gif)

*App demo.*

The filter options are a bit limited right now, I plan to add more in the future. You may either filter by limit *or* by date. The log in the middle of the site shows all the matches as a result from the filter. Click show details to view match stats and some other information about that match. The graphs on the right showcase my MMR change over `n` days, where `n` is the number of matches resulted from the filter.
## Installation

Clone the repo:

```
git clone https://github.com/defcarlito/RL-performance-tracker-dashboard
```

Run the app:

```
npm run dev
```

There are secret keys to access the database of my matches. So, the site will not work as intended if ran locally since the matches will not display as you will not have access to my database of matches.
