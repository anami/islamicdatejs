# islamicdate.js

General purpose Gregorian to Hijri date calculator.  Inspired by the script found at alhabib.info.
Uses a slightly modified version of the "Kuwaiti Algorithm" which is a tabular Islamic date calculator.

## Usage

Suitable for browsers and Node.js

Assuming that is available as variable 'IC' when required in Node.js. 
In browsers - the calculator is accessible via the global variable 'IC'.

### Formatted date

To get today's date formatted - simply: 

	> IC.getIslamicDate();

To specify a date of your own:

	> IC.getIslamicDate(new Date("2012/12/25"));

### Date in parts

To get the date in parts - possibly to format it yourself.

	> IC.getIslamicDateParts();

To get a specific date in parts:
	
	> IC.getIslamicDateParts(new Date("2012/12/25"));


## Notes

The original code was very leaky - global variables everywhere.  
I merely encapsulated it in so that there are no global variables and ensured the code stayed pretty much like the original.
The only major difference is the raw output is in JSON rather than an array.


Enjoy!

