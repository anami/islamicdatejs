/* 
 *  Islamic Date Calculator
 * 
 *  Using a modified version of the "Kuwaiti Algorithm" or Tabular Islamic Calendar to calculate and convert
 *  Gregorian dates to Hijri dates.
 *
 *  Main source : http://www.al-habib.info/islamic-calendar/hijricalendartext.htm
 * 
 *  To use: IC.getIslamicDate([date]);  
 *					[date] : date to convert - leave null or unspecified to use the current date 
 *	
 *  for todays date: 		IC.getIslamicDate();
 *  for an arbitrary date: 	IC.getIslamicDate(new Date("2012/12/25"));
 *  
 * 
 *  Suitable for browser and Node.js 
 *
 *  @anami
 */


(function(exports){

	// constants
	var iyear = 10631./30.,
		epochastro = 1948084,
		epochcivil = 1948085,
		shift1 = 8.01/60.,
		DAYNAMES = new Array("Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt"),
		MONTHNAMES = new Array("Muharram","Safar","Rabi'ul Awwal","Rabi'ul Akhir",
		"Jumadal Ula","Jumadal Akhira","Rajab","Sha'ban",
		"Ramadan","Shawwal","Dhul Qa'ada","Dhul Hijja");


	function gmod(n,m){
		return ((n%m)+m)%m;
	}

	function kuwaiticalendar(date){

		var today = date || new Date();

		var day = today.getDate(),
			month = today.getMonth(),
			year = today.getFullYear(),
			m = month+1,
			y = year;
		
		if(m<3) {
			y -= 1;
			m += 12;
		}

		var a = Math.floor(y/100.),
			b = 2-a+Math.floor(a/4.);
		if(y<1583) b = 0;
		if(y==1582) {
			if(m>10)  b = -10;
			if(m==10) {
				b = 0;
				if(day>4) b = -10;
			}
		}

		var jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;

		b = 0;
		if(jd>2299160){
			a = Math.floor((jd-1867216.25)/36524.25);
			b = 1+a-Math.floor(a/4.);
		}
		var bb = jd+b+1524,
			cc = Math.floor((bb-122.1)/365.25),
			dd = Math.floor(365.25*cc),
			ee = Math.floor((bb-dd)/30.6001);
		day =(bb-dd)-Math.floor(30.6001*ee);
		month = ee-1;
		if(ee>13) {
			cc += 1;
			month = ee-13;
		}
		year = cc-4716;

		var wd = gmod(jd+1,7)+1,
			z = jd-epochastro,
			cyc = Math.floor(z/10631.);

		z = z-10631*cyc;
		
		var j = Math.floor((z-shift1)/iyear),
			iy = 30*cyc+j;	

		z = z-Math.floor(j*iyear+shift1);
		
		var im = Math.floor((z+28.5001)/29.5);
		if(im==13) im = 12;
		
		var id = z-Math.floor(29.5001*im-29);


		var result = {
			gregorian_day : day,
			gregorian_month : month -1,
			gregorian_year : year,
			julian_day : jd-1,
			weekday : wd-1,
			hijri_day : id,
			hijri_month : im-1,
			hijri_year : iy
		}

		return result;
	}

	function getIslamicDate(date) {
		return writeIslamicDate(kuwaiticalendar(date));
	}
  
	function writeIslamicDate(dateResult) {
		var outputIslamicDate = DAYNAMES[dateResult.weekday] + ", " 
		+ dateResult.hijri_day + " " + MONTHNAMES[dateResult.hijri_month] + " " + dateResult.hijri_year + " AH";
		return outputIslamicDate;
	}

	// public API
	exports.getIslamicDate = getIslamicDate;
	exports.getIslamicDateParts = kuwaiticalendar;
	exports.MONTHNAMES = MONTHNAMES;
	exports.DAYNAMES = DAYNAMES;

})(typeof exports === 'undefined' ? this['IC'] = {} : exports);