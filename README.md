# Event Counter

An event counter for JS

# Installation

Using npm:

```shell
$ npm i -g npm
$ npm i lodash
```

Note: add --save if you are using npm < 5.0.0

# Usage

```js
const EventCounter = require('event-counter');

// instantiate an event counter object
const es = EventCounter();

// emit/signal an event, this registers an event count for that perticular second
es.emit();

// getCount returns total count of events that were registered from now till last n seconds
es.getCount(1);

```
