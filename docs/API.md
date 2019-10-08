## Functions

<dl>
<dt><a href="#emit
Registers the event and incremetns the count for that second.
Calls cleanup everytime its invoked which will clean up old stale data out of timeframe">emit
Registers the event and incremetns the count for that second.
Calls cleanup everytime its invoked which will clean up old stale data out of timeframe()</a></dt>
<dd></dd>
<dt><a href="#getCount
Returns the count of total events in last n seconds.">getCount
Returns the count of total events in last n seconds.(lastSeconds)</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#EventCounter">EventCounter</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="emit
Registers the event and incremetns the count for that second.
Calls cleanup everytime its invoked which will clean up old stale data out of timeframe"></a>

## emit
Registers the event and incremetns the count for that second.
Calls cleanup everytime its invoked which will clean up old stale data out of timeframe()
**Kind**: global function  
<a name="getCount
Returns the count of total events in last n seconds."></a>

## getCount
Returns the count of total events in last n seconds.(lastSeconds)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| lastSeconds | <code>int</code> | n previous seconds from now |

<a name="EventCounter"></a>

## EventCounter : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| emit | <code>function</code> | Emits/signals event that needs to be accumulated |
| getCount | <code>function</code> | Get the count of events registered in last n seconds |

