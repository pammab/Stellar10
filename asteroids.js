// Asteroid Analyzer (team feature): Sentry impact-risk dashboard, ASTORB orbit explorer, and their translations.
// 小行星分析 · Analizador de asteroides. Plain script, loaded after the page.

/* STELLAR · Local analysis of the uploaded Sentry CSV snapshot */
(() => {
  const $ = id => document.getElementById(id);
  const app = $('asteroidApp'), openBtn = $('asteroidOpen');
  if (!app || !openBtn) return;
  const records = [{"date":"2069-09-18.49","sigmaVI":3.9951,"probability":2.2e-07,"energy":1.047,"palermo":-6.75,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2070-09-17.32","sigmaVI":1.7269,"probability":0.00023,"energy":1.047,"palermo":-3.74,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2071-09-10.38","sigmaVI":0.7169,"probability":0.00014,"energy":1.046,"palermo":-3.96,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2071-09-16.04","sigmaVI":0.8616,"probability":0.001,"energy":1.047,"palermo":-3.1,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2072-02-03.49","sigmaVI":1.8323,"probability":2.7e-06,"energy":1.048,"palermo":-5.69,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2072-09-13.70","sigmaVI":3.8454,"probability":1.4e-06,"energy":1.047,"palermo":-5.98,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2073-01-29.26","sigmaVI":1.8394,"probability":6.7e-07,"energy":1.048,"palermo":-6.31,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2073-02-01.76","sigmaVI":0.7346,"probability":1.3e-05,"energy":1.045,"palermo":-5.0,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2073-02-09.21","sigmaVI":1.8266,"probability":5e-06,"energy":1.047,"palermo":-5.44,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2073-02-12.03","sigmaVI":1.7816,"probability":1e-05,"energy":1.048,"palermo":-5.12,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2074-01-28.50","sigmaVI":0.7364,"probability":3.4e-06,"energy":1.045,"palermo":-5.61,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2074-02-08.48","sigmaVI":0.7448,"probability":4e-05,"energy":1.046,"palermo":-4.54,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2074-02-10.46","sigmaVI":0.7853,"probability":4.1e-05,"energy":1.046,"palermo":-4.53,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2078-09-01.26","sigmaVI":0.8762,"probability":2.3e-06,"energy":1.047,"palermo":-5.82,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2079-08-14.32","sigmaVI":0.8857,"probability":2.1e-06,"energy":1.044,"palermo":-5.87,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2079-09-02.65","sigmaVI":0.8814,"probability":1.3e-06,"energy":1.044,"palermo":-6.07,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2079-09-03.70","sigmaVI":0.7191,"probability":1.2e-08,"energy":1.053,"palermo":-8.09,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2079-09-04.90","sigmaVI":1.6473,"probability":2.6e-06,"energy":1.045,"palermo":-5.77,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2080-09-06.27","sigmaVI":0.8883,"probability":1.3e-06,"energy":1.046,"palermo":-6.09,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2080-09-08.13","sigmaVI":1.7056,"probability":4.2e-07,"energy":1.048,"palermo":-6.57,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2081-09-07.39","sigmaVI":0.8918,"probability":1.6e-06,"energy":1.047,"palermo":-6.0,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2081-09-10.13","sigmaVI":1.7027,"probability":4e-07,"energy":1.049,"palermo":-6.6,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2082-09-07.09","sigmaVI":1.3214,"probability":1.8e-06,"energy":1.046,"palermo":-5.96,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2083-06-28.71","sigmaVI":1.2175,"probability":3.9e-07,"energy":1.047,"palermo":-6.62,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2083-09-07.23","sigmaVI":0.9042,"probability":1.9e-06,"energy":1.048,"palermo":-5.93,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2083-09-09.17","sigmaVI":2.4332,"probability":5.3e-07,"energy":1.048,"palermo":-6.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2084-09-06.31","sigmaVI":0.9035,"probability":2.2e-06,"energy":1.047,"palermo":-5.89,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2085-09-03.16","sigmaVI":0.855,"probability":5.6e-07,"energy":1.045,"palermo":-6.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2085-09-06.78","sigmaVI":0.9078,"probability":2.3e-06,"energy":1.046,"palermo":-5.87,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2086-09-03.24","sigmaVI":0.8648,"probability":5.6e-07,"energy":1.046,"palermo":-6.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2086-09-07.79","sigmaVI":0.9121,"probability":2.4e-06,"energy":1.047,"palermo":-5.86,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2087-08-31.85","sigmaVI":1.7632,"probability":2e-07,"energy":1.046,"palermo":-6.95,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2087-09-03.61","sigmaVI":0.8378,"probability":6.1e-07,"energy":1.045,"palermo":-6.46,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2087-09-08.36","sigmaVI":0.9165,"probability":2.6e-06,"energy":1.047,"palermo":-5.83,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2087-09-10.02","sigmaVI":1.6835,"probability":7.5e-07,"energy":1.048,"palermo":-6.37,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2088-04-22.94","sigmaVI":0.2464,"probability":1.1e-06,"energy":1.047,"palermo":-6.21,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2088-09-02.90","sigmaVI":0.8365,"probability":6.1e-07,"energy":1.048,"palermo":-6.47,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2088-09-04.64","sigmaVI":1.8005,"probability":1.2e-07,"energy":1.048,"palermo":-7.18,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2088-09-07.49","sigmaVI":0.9211,"probability":2.8e-06,"energy":1.048,"palermo":-5.81,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2088-12-07.19","sigmaVI":1.3946,"probability":5.6e-07,"energy":1.047,"palermo":-6.51,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2089-09-03.18","sigmaVI":1.1123,"probability":6.4e-07,"energy":1.047,"palermo":-6.45,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2089-09-04.94","sigmaVI":1.7497,"probability":1.2e-07,"energy":1.047,"palermo":-7.16,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2089-09-07.79","sigmaVI":0.926,"probability":3.1e-06,"energy":1.047,"palermo":-5.76,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2089-09-09.43","sigmaVI":1.6762,"probability":9.5e-07,"energy":1.048,"palermo":-6.28,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2090-09-03.33","sigmaVI":0.8486,"probability":2.8e-07,"energy":1.046,"palermo":-6.82,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2090-09-07.14","sigmaVI":0.89,"probability":9.2e-07,"energy":1.047,"palermo":-6.3,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2090-09-08.40","sigmaVI":0.931,"probability":3.4e-06,"energy":1.047,"palermo":-5.74,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2091-08-03.61","sigmaVI":0.0498,"probability":2.6e-05,"energy":1.047,"palermo":-4.85,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2091-09-08.80","sigmaVI":0.9363,"probability":3.7e-06,"energy":1.047,"palermo":-5.71,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2091-09-08.87","sigmaVI":1.7824,"probability":2.7e-07,"energy":1.048,"palermo":-6.84,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2091-09-10.55","sigmaVI":1.6683,"probability":1.1e-06,"energy":1.049,"palermo":-6.22,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-04-21.70","sigmaVI":0.6407,"probability":3.1e-07,"energy":1.045,"palermo":-6.8,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-05-20.11","sigmaVI":0.8619,"probability":2.3e-07,"energy":1.047,"palermo":-6.91,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-08-05.75","sigmaVI":0.0294,"probability":2.1e-05,"energy":1.046,"palermo":-4.96,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-08-09.90","sigmaVI":2.436,"probability":1.4e-06,"energy":1.048,"palermo":-6.13,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-09-03.27","sigmaVI":1.638,"probability":7.4e-07,"energy":1.045,"palermo":-6.41,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-09-07.32","sigmaVI":0.8936,"probability":1.1e-06,"energy":1.047,"palermo":-6.24,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-09-08.18","sigmaVI":0.9419,"probability":4.1e-06,"energy":1.047,"palermo":-5.66,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-09-09.81","sigmaVI":1.6641,"probability":1.3e-06,"energy":1.048,"palermo":-6.16,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2092-12-22.47","sigmaVI":0.6497,"probability":5.9e-07,"energy":1.046,"palermo":-6.52,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2093-07-26.56","sigmaVI":0.4284,"probability":6e-07,"energy":1.047,"palermo":-6.51,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2093-08-04.59","sigmaVI":2.8291,"probability":4.4e-07,"energy":1.045,"palermo":-6.64,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2093-08-08.80","sigmaVI":0.0067,"probability":2.9e-05,"energy":1.046,"palermo":-4.83,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2093-08-12.77","sigmaVI":2.4582,"probability":1.6e-06,"energy":1.049,"palermo":-6.09,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2093-09-03.62","sigmaVI":0.8301,"probability":7.5e-07,"energy":1.047,"palermo":-6.41,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2093-09-08.68","sigmaVI":0.9478,"probability":4.5e-06,"energy":1.047,"palermo":-5.63,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2093-09-10.11","sigmaVI":1.6596,"probability":1.4e-06,"energy":1.049,"palermo":-6.13,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2094-04-22.36","sigmaVI":0.2635,"probability":9e-07,"energy":1.046,"palermo":-6.34,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2094-08-10.74","sigmaVI":0.9084,"probability":5.8e-07,"energy":1.049,"palermo":-6.53,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2094-08-11.71","sigmaVI":0.0186,"probability":3.6e-05,"energy":1.047,"palermo":-4.74,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2094-09-03.95","sigmaVI":0.8289,"probability":7.9e-07,"energy":1.047,"palermo":-6.4,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2094-09-05.75","sigmaVI":1.7523,"probability":1.6e-07,"energy":1.047,"palermo":-7.09,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2094-09-09.01","sigmaVI":0.954,"probability":5.1e-06,"energy":1.047,"palermo":-5.58,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2094-09-10.76","sigmaVI":1.6548,"probability":1.7e-06,"energy":1.049,"palermo":-6.07,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-08-01.70","sigmaVI":0.7522,"probability":9.9e-07,"energy":1.047,"palermo":-6.31,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-08-05.73","sigmaVI":2.4841,"probability":4.5e-08,"energy":1.047,"palermo":-7.65,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-08-10.71","sigmaVI":2.7759,"probability":8.6e-07,"energy":1.047,"palermo":-6.36,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-08-14.69","sigmaVI":0.0458,"probability":4.1e-05,"energy":1.047,"palermo":-4.69,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-08-18.63","sigmaVI":2.5104,"probability":2.1e-06,"energy":1.048,"palermo":-5.97,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-08-31.07","sigmaVI":0.7774,"probability":1.6e-07,"energy":1.046,"palermo":-7.1,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-08-31.87","sigmaVI":1.4476,"probability":2.4e-07,"energy":1.046,"palermo":-6.92,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-09-04.38","sigmaVI":0.994,"probability":8.3e-07,"energy":1.047,"palermo":-6.38,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-09-07.86","sigmaVI":3.9728,"probability":4.2e-09,"energy":1.046,"palermo":-8.68,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-09-09.63","sigmaVI":0.9606,"probability":5.7e-06,"energy":1.047,"palermo":-5.54,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-09-11.43","sigmaVI":1.6497,"probability":1.9e-06,"energy":1.048,"palermo":-6.02,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2095-12-16.55","sigmaVI":2.0782,"probability":1.7e-07,"energy":1.048,"palermo":-7.09,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-08-03.74","sigmaVI":0.0476,"probability":1.1e-06,"energy":1.046,"palermo":-6.26,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-08-16.48","sigmaVI":0.0761,"probability":4.5e-05,"energy":1.047,"palermo":-4.65,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-08-31.97","sigmaVI":2.5297,"probability":4.3e-07,"energy":1.047,"palermo":-6.68,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-09-05.83","sigmaVI":0.9013,"probability":2.6e-06,"energy":1.046,"palermo":-5.89,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-09-07.01","sigmaVI":1.2937,"probability":1.2e-06,"energy":1.044,"palermo":-6.23,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-09-09.03","sigmaVI":0.9677,"probability":6.5e-06,"energy":1.048,"palermo":-5.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-09-10.83","sigmaVI":1.6442,"probability":2.2e-06,"energy":1.049,"palermo":-5.95,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-12-13.87","sigmaVI":2.0755,"probability":3.7e-07,"energy":1.048,"palermo":-6.74,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2096-12-14.42","sigmaVI":0.4228,"probability":3.1e-06,"energy":1.046,"palermo":-5.81,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-08-06.58","sigmaVI":0.0781,"probability":1e-06,"energy":1.046,"palermo":-6.3,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-08-15.33","sigmaVI":2.7119,"probability":1.3e-06,"energy":1.046,"palermo":-6.21,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-08-19.24","sigmaVI":0.1101,"probability":5.2e-05,"energy":1.046,"palermo":-4.59,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-08-23.24","sigmaVI":2.5764,"probability":2.3e-06,"energy":1.047,"palermo":-5.96,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-08-24.93","sigmaVI":0.7279,"probability":3.6e-07,"energy":1.048,"palermo":-6.75,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-08-30.84","sigmaVI":0.0973,"probability":1.2e-05,"energy":1.046,"palermo":-5.23,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-08-31.90","sigmaVI":2.5659,"probability":9.6e-07,"energy":1.049,"palermo":-6.33,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-09-04.40","sigmaVI":0.8473,"probability":9.3e-07,"energy":1.046,"palermo":-6.35,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-09-06.74","sigmaVI":1.131,"probability":1.5e-06,"energy":1.047,"palermo":-6.14,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-09-07.42","sigmaVI":1.2965,"probability":4.8e-07,"energy":1.046,"palermo":-6.63,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-09-09.55","sigmaVI":0.9754,"probability":7.6e-06,"energy":1.047,"palermo":-5.43,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-09-11.39","sigmaVI":1.6384,"probability":2.7e-06,"energy":1.048,"palermo":-5.88,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-12-12.32","sigmaVI":2.0729,"probability":4.1e-07,"energy":1.048,"palermo":-6.71,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2097-12-12.78","sigmaVI":0.426,"probability":3.8e-06,"energy":1.046,"palermo":-5.74,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-07-27.23","sigmaVI":1.8044,"probability":7.3e-08,"energy":1.047,"palermo":-7.45,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-07-28.10","sigmaVI":1.7297,"probability":1.5e-07,"energy":1.049,"palermo":-7.13,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-09.29","sigmaVI":1.5046,"probability":9.5e-07,"energy":1.047,"palermo":-6.34,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-18.16","sigmaVI":2.6743,"probability":1.6e-06,"energy":1.046,"palermo":-6.13,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-22.08","sigmaVI":0.1486,"probability":6.2e-05,"energy":1.046,"palermo":-4.53,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-25.27","sigmaVI":0.5439,"probability":7.3e-07,"energy":1.047,"palermo":-6.46,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-26.29","sigmaVI":2.6167,"probability":3.2e-06,"energy":1.047,"palermo":-5.82,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-26.44","sigmaVI":2.573,"probability":5.6e-08,"energy":1.047,"palermo":-7.57,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-29.86","sigmaVI":2.6885,"probability":3.6e-07,"energy":1.045,"palermo":-6.76,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-30.99","sigmaVI":0.1367,"probability":2.7e-05,"energy":1.046,"palermo":-4.89,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-08-31.66","sigmaVI":2.6088,"probability":2.2e-06,"energy":1.048,"palermo":-5.98,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-09-04.94","sigmaVI":0.8241,"probability":9.9e-07,"energy":1.046,"palermo":-6.32,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-09-06.87","sigmaVI":0.9071,"probability":4.6e-07,"energy":1.047,"palermo":-6.65,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-09-10.33","sigmaVI":0.9836,"probability":9e-06,"energy":1.047,"palermo":-5.37,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-09-12.40","sigmaVI":1.6321,"probability":3.2e-06,"energy":1.048,"palermo":-5.81,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2098-12-11.33","sigmaVI":0.4291,"probability":3.6e-06,"energy":1.048,"palermo":-5.76,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-08-21.22","sigmaVI":2.6326,"probability":2.1e-06,"energy":1.045,"palermo":-6.0,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-08-25.49","sigmaVI":0.1911,"probability":0.00011,"energy":1.045,"palermo":-4.3,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-08-25.66","sigmaVI":0.1356,"probability":1.6e-06,"energy":1.047,"palermo":-6.13,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-08-29.97","sigmaVI":2.6451,"probability":9.3e-07,"energy":1.047,"palermo":-6.35,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-08-30.72","sigmaVI":0.1828,"probability":6.9e-05,"energy":1.047,"palermo":-4.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-09-01.29","sigmaVI":1.1512,"probability":2.4e-07,"energy":1.047,"palermo":-6.94,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-09-05.49","sigmaVI":0.8229,"probability":1e-06,"energy":1.046,"palermo":-6.3,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-09-11.02","sigmaVI":0.9926,"probability":1.1e-05,"energy":1.047,"palermo":-5.28,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-09-13.40","sigmaVI":1.6253,"probability":4.7e-06,"energy":1.049,"palermo":-5.65,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-12-09.74","sigmaVI":2.0679,"probability":2.9e-07,"energy":1.047,"palermo":-6.87,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2099-12-09.96","sigmaVI":0.4322,"probability":2.9e-06,"energy":1.046,"palermo":-5.86,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-08-24.36","sigmaVI":2.5854,"probability":4.1e-06,"energy":1.047,"palermo":-5.72,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-08-25.10","sigmaVI":2.0725,"probability":1.3e-08,"energy":1.05,"palermo":-8.21,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-08-25.67","sigmaVI":0.1807,"probability":2.8e-06,"energy":1.048,"palermo":-5.89,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-08-26.39","sigmaVI":2.6565,"probability":1.5e-07,"energy":1.049,"palermo":-7.16,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-08-29.48","sigmaVI":2.5943,"probability":2.7e-06,"energy":1.047,"palermo":-5.89,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-09-01.34","sigmaVI":0.877,"probability":2.5e-06,"energy":1.046,"palermo":-5.93,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-09-04.88","sigmaVI":0.9785,"probability":1.6e-07,"energy":1.047,"palermo":-7.12,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-09-11.98","sigmaVI":1.0024,"probability":1.6e-05,"energy":1.047,"palermo":-5.14,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-09-15.94","sigmaVI":1.6183,"probability":2.8e-05,"energy":1.048,"palermo":-4.89,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2100-12-08.71","sigmaVI":0.4352,"probability":1.4e-06,"energy":1.045,"palermo":-6.18,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-08-23.86","sigmaVI":2.7184,"probability":2.1e-06,"energy":1.047,"palermo":-6.02,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-08-24.31","sigmaVI":2.7176,"probability":2.1e-06,"energy":1.047,"palermo":-6.01,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-08-24.44","sigmaVI":2.5967,"probability":1.1e-07,"energy":1.047,"palermo":-7.29,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-08-25.32","sigmaVI":0.2336,"probability":5.3e-06,"energy":1.047,"palermo":-5.61,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-09-02.83","sigmaVI":0.9444,"probability":3.2e-07,"energy":1.047,"palermo":-6.83,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-09-04.09","sigmaVI":1.7046,"probability":2.7e-07,"energy":1.048,"palermo":-6.9,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-09-06.84","sigmaVI":0.8202,"probability":1.3e-06,"energy":1.045,"palermo":-6.24,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-09-09.22","sigmaVI":1.7589,"probability":7.6e-07,"energy":1.049,"palermo":-6.46,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-09-14.00","sigmaVI":1.0128,"probability":4.4e-05,"energy":1.047,"palermo":-4.7,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-09-16.14","sigmaVI":1.012,"probability":3.1e-05,"energy":1.047,"palermo":-4.85,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2101-12-07.54","sigmaVI":0.4381,"probability":6.1e-07,"energy":1.047,"palermo":-6.56,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-01-25.40","sigmaVI":1.03,"probability":2.1e-07,"energy":1.046,"palermo":-7.02,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-08-10.56","sigmaVI":0.8953,"probability":5.3e-07,"energy":1.048,"palermo":-6.62,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-08-22.39","sigmaVI":0.3017,"probability":2.3e-05,"energy":1.045,"palermo":-4.98,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-08-23.80","sigmaVI":0.2988,"probability":2.8e-05,"energy":1.045,"palermo":-4.89,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-08-24.31","sigmaVI":2.5379,"probability":2.3e-07,"energy":1.047,"palermo":-6.97,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-09-02.66","sigmaVI":1.4008,"probability":7.9e-07,"energy":1.047,"palermo":-6.45,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-09-05.56","sigmaVI":1.809,"probability":5.4e-07,"energy":1.049,"palermo":-6.61,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-09-07.80","sigmaVI":0.8186,"probability":1.6e-06,"energy":1.046,"palermo":-6.14,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-09-09.59","sigmaVI":1.7386,"probability":1.9e-07,"energy":1.049,"palermo":-7.06,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-09-10.56","sigmaVI":1.6222,"probability":3.6e-07,"energy":1.048,"palermo":-6.78,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-09-11.15","sigmaVI":1.9666,"probability":5.8e-07,"energy":1.047,"palermo":-6.58,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-09-12.13","sigmaVI":1.1988,"probability":3.6e-07,"energy":1.047,"palermo":-6.78,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2102-12-02.04","sigmaVI":0.8388,"probability":2.8e-06,"energy":1.047,"palermo":-5.91,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-01-16.48","sigmaVI":2.2576,"probability":9.3e-07,"energy":1.048,"palermo":-6.38,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-01-30.70","sigmaVI":0.234,"probability":1.6e-07,"energy":1.046,"palermo":-7.14,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-08-21.20","sigmaVI":2.4609,"probability":7.3e-07,"energy":1.047,"palermo":-6.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-08-23.26","sigmaVI":2.4656,"probability":9.9e-07,"energy":1.046,"palermo":-6.35,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-09-04.39","sigmaVI":1.0262,"probability":1.7e-06,"energy":1.047,"palermo":-6.12,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-09-08.03","sigmaVI":1.3209,"probability":5.6e-07,"energy":1.047,"palermo":-6.6,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-09-09.00","sigmaVI":0.7918,"probability":4.7e-07,"energy":1.047,"palermo":-6.68,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-09-09.40","sigmaVI":1.0243,"probability":1.3e-06,"energy":1.046,"palermo":-6.25,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-09-09.93","sigmaVI":1.6844,"probability":2.7e-07,"energy":1.048,"palermo":-6.92,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2103-09-12.89","sigmaVI":0.8136,"probability":2e-06,"energy":1.046,"palermo":-6.05,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2104-01-27.30","sigmaVI":0.846,"probability":1.7e-06,"energy":1.046,"palermo":-6.12,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2104-01-29.45","sigmaVI":0.7316,"probability":1.4e-06,"energy":1.045,"palermo":-6.22,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2104-09-07.23","sigmaVI":3.7802,"probability":5.8e-09,"energy":1.048,"palermo":-8.59,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2104-09-08.37","sigmaVI":2.3981,"probability":5.3e-07,"energy":1.047,"palermo":-6.63,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2104-09-09.71","sigmaVI":0.4405,"probability":8.6e-06,"energy":1.046,"palermo":-5.42,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2104-09-10.35","sigmaVI":3.7762,"probability":4.2e-09,"energy":1.046,"palermo":-8.73,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2104-09-10.77","sigmaVI":2.9273,"probability":1.6e-07,"energy":1.048,"palermo":-7.14,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2104-12-05.67","sigmaVI":0.8382,"probability":1.6e-06,"energy":1.046,"palermo":-6.15,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2105-02-06.61","sigmaVI":1.076,"probability":5.6e-08,"energy":1.047,"palermo":-7.61,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2105-09-08.84","sigmaVI":2.3049,"probability":8.6e-07,"energy":1.046,"palermo":-6.43,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2105-09-10.00","sigmaVI":0.534,"probability":1.4e-05,"energy":1.046,"palermo":-5.23,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2106-01-24.62","sigmaVI":0.4178,"probability":3.7e-07,"energy":1.047,"palermo":-6.79,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2106-09-08.52","sigmaVI":0.9245,"probability":9.8e-07,"energy":1.047,"palermo":-6.37,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2106-09-09.42","sigmaVI":2.1959,"probability":1.9e-06,"energy":1.046,"palermo":-6.09,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2106-09-10.34","sigmaVI":0.6376,"probability":1.9e-05,"energy":1.045,"palermo":-5.08,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2107-04-24.62","sigmaVI":0.5225,"probability":1e-06,"energy":1.048,"palermo":-6.36,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2107-08-02.73","sigmaVI":1.3342,"probability":1.8e-07,"energy":1.045,"palermo":-7.11,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2107-09-09.85","sigmaVI":2.0712,"probability":3.5e-06,"energy":1.046,"palermo":-5.83,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2107-09-10.52","sigmaVI":0.7496,"probability":2.3e-05,"energy":1.046,"palermo":-5.0,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2108-01-24.65","sigmaVI":0.5325,"probability":6.7e-07,"energy":1.047,"palermo":-6.55,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2108-01-31.74","sigmaVI":0.9685,"probability":3.6e-07,"energy":1.047,"palermo":-6.82,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2108-02-06.26","sigmaVI":0.748,"probability":8.6e-07,"energy":1.047,"palermo":-6.44,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2108-09-03.37","sigmaVI":0.8347,"probability":2.4e-07,"energy":1.046,"palermo":-6.99,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2108-09-09.23","sigmaVI":1.9317,"probability":6.5e-06,"energy":1.046,"palermo":-5.56,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2108-09-09.67","sigmaVI":0.8686,"probability":2.9e-05,"energy":1.047,"palermo":-4.92,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-01-27.29","sigmaVI":0.5313,"probability":9.1e-07,"energy":1.046,"palermo":-6.42,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-01-30.40","sigmaVI":0.7753,"probability":1.6e-06,"energy":1.045,"palermo":-6.17,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-08-20.99","sigmaVI":0.1864,"probability":2.6e-06,"energy":1.047,"palermo":-5.96,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-08-21.09","sigmaVI":0.1866,"probability":2.6e-06,"energy":1.047,"palermo":-5.97,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-09-03.43","sigmaVI":0.9903,"probability":6e-07,"energy":1.048,"palermo":-6.6,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-09-09.87","sigmaVI":0.9964,"probability":3.3e-05,"energy":1.048,"palermo":-4.87,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-09-11.41","sigmaVI":1.1195,"probability":3.8e-07,"energy":1.047,"palermo":-6.8,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-09-14.70","sigmaVI":1.1791,"probability":2.4e-06,"energy":1.047,"palermo":-6.0,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2109-09-14.77","sigmaVI":1.4831,"probability":1.5e-06,"energy":1.048,"palermo":-6.2,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2110-01-30.38","sigmaVI":0.6354,"probability":2.1e-06,"energy":1.046,"palermo":-6.07,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2110-02-04.97","sigmaVI":2.0728,"probability":1.5e-07,"energy":1.046,"palermo":-7.21,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2110-02-05.55","sigmaVI":0.8152,"probability":9.7e-07,"energy":1.045,"palermo":-6.4,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2110-09-04.15","sigmaVI":1.1391,"probability":2.3e-06,"energy":1.049,"palermo":-6.02,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2110-09-10.22","sigmaVI":1.148,"probability":4.5e-05,"energy":1.048,"palermo":-4.73,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2110-09-12.95","sigmaVI":1.2519,"probability":1.7e-05,"energy":1.046,"palermo":-5.17,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2111-01-25.85","sigmaVI":1.883,"probability":1.2e-07,"energy":1.046,"palermo":-7.32,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2111-01-29.85","sigmaVI":2.1361,"probability":3.2e-07,"energy":1.045,"palermo":-6.89,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2111-01-30.14","sigmaVI":0.7468,"probability":3.3e-06,"energy":1.045,"palermo":-5.88,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2111-02-05.63","sigmaVI":1.2983,"probability":9.8e-07,"energy":1.045,"palermo":-6.4,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2111-04-24.02","sigmaVI":0.8391,"probability":1.7e-07,"energy":1.047,"palermo":-7.15,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2112-01-28.55","sigmaVI":1.9361,"probability":6.5e-07,"energy":1.045,"palermo":-6.58,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2112-02-02.09","sigmaVI":1.0586,"probability":6.9e-07,"energy":1.048,"palermo":-6.56,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2112-02-03.20","sigmaVI":1.4681,"probability":3.3e-07,"energy":1.048,"palermo":-6.88,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2112-02-03.23","sigmaVI":1.2503,"probability":4.2e-07,"energy":1.047,"palermo":-6.77,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2112-02-05.54","sigmaVI":2.5044,"probability":3e-07,"energy":1.047,"palermo":-6.92,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2112-02-05.68","sigmaVI":1.8513,"probability":8.5e-07,"energy":1.048,"palermo":-6.47,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2112-09-09.26","sigmaVI":0.9401,"probability":5.6e-07,"energy":1.047,"palermo":-6.65,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-02-01.44","sigmaVI":1.5962,"probability":5.2e-07,"energy":1.047,"palermo":-6.68,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-02-03.05","sigmaVI":1.8038,"probability":1.6e-07,"energy":1.047,"palermo":-7.19,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-02-04.89","sigmaVI":1.1438,"probability":1.3e-06,"energy":1.047,"palermo":-6.28,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-02-04.92","sigmaVI":1.6186,"probability":4.1e-07,"energy":1.048,"palermo":-6.79,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-02-04.98","sigmaVI":1.6522,"probability":7e-07,"energy":1.046,"palermo":-6.56,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-02-07.82","sigmaVI":1.6502,"probability":8.1e-07,"energy":1.048,"palermo":-6.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-02-07.85","sigmaVI":1.2497,"probability":1e-06,"energy":1.045,"palermo":-6.39,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-08-07.04","sigmaVI":0.7973,"probability":9.1e-07,"energy":1.047,"palermo":-6.44,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2113-09-07.68","sigmaVI":0.7961,"probability":4.8e-07,"energy":1.046,"palermo":-6.72,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2114-08-07.14","sigmaVI":0.0375,"probability":1.1e-06,"energy":1.046,"palermo":-6.36,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2114-08-08.08","sigmaVI":1.0906,"probability":1.4e-06,"energy":1.046,"palermo":-6.27,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2114-08-14.14","sigmaVI":0.3654,"probability":3.9e-07,"energy":1.045,"palermo":-6.82,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2114-08-18.79","sigmaVI":0.8155,"probability":4.4e-07,"energy":1.045,"palermo":-6.77,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2114-08-22.45","sigmaVI":0.2477,"probability":2.9e-07,"energy":1.047,"palermo":-6.94,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2114-09-05.01","sigmaVI":0.7986,"probability":8e-07,"energy":1.046,"palermo":-6.5,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2114-09-06.40","sigmaVI":0.797,"probability":1.1e-06,"energy":1.045,"palermo":-6.36,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2114-09-10.16","sigmaVI":0.9628,"probability":4.9e-07,"energy":1.047,"palermo":-6.71,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2115-02-05.00","sigmaVI":1.0051,"probability":1.4e-07,"energy":1.047,"palermo":-7.27,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2115-07-26.00","sigmaVI":0.4406,"probability":7e-07,"energy":1.046,"palermo":-6.57,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2115-08-08.83","sigmaVI":1.0813,"probability":1.3e-07,"energy":1.054,"palermo":-7.28,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2115-08-09.47","sigmaVI":0.0179,"probability":1.5e-06,"energy":1.045,"palermo":-6.23,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2115-08-10.76","sigmaVI":0.0137,"probability":1.1e-06,"energy":1.048,"palermo":-6.39,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2115-08-13.15","sigmaVI":2.5749,"probability":6.6e-08,"energy":1.049,"palermo":-7.59,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2115-08-19.63","sigmaVI":0.143,"probability":5.9e-07,"energy":1.046,"palermo":-6.64,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2116-07-22.20","sigmaVI":1.9762,"probability":4.9e-07,"energy":1.048,"palermo":-6.73,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2116-07-26.40","sigmaVI":1.1878,"probability":8e-07,"energy":1.046,"palermo":-6.51,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2116-08-10.78","sigmaVI":0.0126,"probability":1.5e-06,"energy":1.047,"palermo":-6.23,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2116-08-13.53","sigmaVI":2.6696,"probability":8.5e-08,"energy":1.048,"palermo":-7.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2116-08-14.38","sigmaVI":1.1645,"probability":6.5e-07,"energy":1.046,"palermo":-6.6,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2116-08-19.97","sigmaVI":0.1446,"probability":1.5e-06,"energy":1.046,"palermo":-6.23,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2117-07-19.82","sigmaVI":1.1445,"probability":3.4e-07,"energy":1.048,"palermo":-6.88,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2117-07-22.88","sigmaVI":1.5939,"probability":4.7e-07,"energy":1.048,"palermo":-6.75,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2117-07-27.65","sigmaVI":0.6696,"probability":7.8e-07,"energy":1.047,"palermo":-6.53,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2117-08-08.96","sigmaVI":3.0447,"probability":4e-08,"energy":1.047,"palermo":-7.82,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2117-08-12.12","sigmaVI":0.0112,"probability":1.9e-06,"energy":1.047,"palermo":-6.14,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2117-08-15.38","sigmaVI":0.5356,"probability":8.8e-07,"energy":1.046,"palermo":-6.47,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2117-08-17.20","sigmaVI":2.5044,"probability":4.8e-08,"energy":1.049,"palermo":-7.74,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2117-08-17.53","sigmaVI":0.1041,"probability":8.4e-07,"energy":1.047,"palermo":-6.49,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2118-07-26.20","sigmaVI":0.2781,"probability":5.9e-07,"energy":1.046,"palermo":-6.66,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2118-08-13.96","sigmaVI":0.01,"probability":1.9e-06,"energy":1.048,"palermo":-6.15,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2118-08-16.28","sigmaVI":0.6954,"probability":1.2e-06,"energy":1.047,"palermo":-6.36,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2118-08-18.70","sigmaVI":0.4427,"probability":1.1e-06,"energy":1.046,"palermo":-6.37,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-07-28.99","sigmaVI":0.174,"probability":4e-07,"energy":1.046,"palermo":-6.83,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-07-29.24","sigmaVI":0.0884,"probability":6.4e-07,"energy":1.047,"palermo":-6.62,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-07-31.04","sigmaVI":0.0024,"probability":7.3e-07,"energy":1.048,"palermo":-6.57,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-08-15.45","sigmaVI":2.7192,"probability":3.2e-08,"energy":1.046,"palermo":-7.92,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-08-16.13","sigmaVI":0.0098,"probability":1.5e-06,"energy":1.045,"palermo":-6.24,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-08-17.94","sigmaVI":0.0682,"probability":1.7e-06,"energy":1.046,"palermo":-6.21,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-08-20.70","sigmaVI":0.1013,"probability":3.2e-06,"energy":1.047,"palermo":-5.93,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-08-20.94","sigmaVI":2.5018,"probability":1.2e-07,"energy":1.048,"palermo":-7.36,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-08-21.91","sigmaVI":0.1,"probability":2.4e-06,"energy":1.046,"palermo":-6.04,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-08-24.20","sigmaVI":1.7182,"probability":2.8e-08,"energy":1.047,"palermo":-7.98,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2119-09-12.19","sigmaVI":1.1935,"probability":2.5e-07,"energy":1.047,"palermo":-7.03,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2120-08-01.48","sigmaVI":0.5156,"probability":9.8e-07,"energy":1.046,"palermo":-6.44,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2120-08-16.76","sigmaVI":1.8205,"probability":9.1e-08,"energy":1.047,"palermo":-7.47,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2120-08-17.84","sigmaVI":0.0356,"probability":2.3e-06,"energy":1.048,"palermo":-6.07,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2120-08-21.03","sigmaVI":0.0647,"probability":1.6e-06,"energy":1.047,"palermo":-6.24,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2121-07-23.91","sigmaVI":0.2783,"probability":6.1e-07,"energy":1.047,"palermo":-6.65,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2121-07-26.63","sigmaVI":1.4145,"probability":6.5e-07,"energy":1.047,"palermo":-6.62,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2121-07-31.43","sigmaVI":0.1252,"probability":6.5e-07,"energy":1.046,"palermo":-6.63,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2121-08-02.22","sigmaVI":0.0869,"probability":1.6e-06,"energy":1.048,"palermo":-6.23,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2121-08-17.54","sigmaVI":2.7223,"probability":7.8e-08,"energy":1.047,"palermo":-7.55,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2121-08-20.19","sigmaVI":2.7283,"probability":3.6e-08,"energy":1.047,"palermo":-7.88,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2121-09-16.76","sigmaVI":1.6464,"probability":1e-06,"energy":1.048,"palermo":-6.42,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2122-07-29.96","sigmaVI":1.355,"probability":6.4e-07,"energy":1.046,"palermo":-6.64,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2122-08-01.42","sigmaVI":1.137,"probability":5.5e-07,"energy":1.047,"palermo":-6.7,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2122-08-03.24","sigmaVI":1.2108,"probability":8.3e-07,"energy":1.047,"palermo":-6.52,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"},{"date":"2122-08-04.72","sigmaVI":0.0525,"probability":1.1e-06,"energy":1.046,"palermo":-6.42,"torino":0,"distance":"\u2014","width":"\u2014","sigmaImpact":null,"sigmaLOV":null,"stretchLOV":"\u2014"}];
  let selected = null;
  const fmt = (n, digits=3) => Number.isFinite(n) ? Number(n).toLocaleString(undefined,{maximumFractionDigits:digits}) : '—';
  const pct = p => Number.isFinite(p) ? (p*100).toLocaleString(undefined,{maximumFractionDigits:6})+'%' : '—';
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateKey = s => String(s).slice(0,10);
  const sortedByDate = [...records].sort((a,b)=>dateKey(a.date).localeCompare(dateKey(b.date)));
  function show(){app.classList.add('open');document.body.style.overflow='auto';analyze();}
  function hide(){app.classList.remove('open');document.body.style.overflow='hidden';}
  openBtn.addEventListener('click',show);
  $('asteroidClose').addEventListener('click',hide);
  $('asteroidRefresh').addEventListener('click',analyze);
  $('astSearch').addEventListener('input',renderRows);
  $('astSort').addEventListener('change',renderRows);
  function analyze(){
    const validProb=records.filter(x=>Number.isFinite(x.probability));
    const validEnergy=records.map(x=>x.energy).filter(Number.isFinite);
    const max=validProb.reduce((a,b)=>!a||b.probability>a.probability?b:a,null);
    const minEnergy=Math.min(...validEnergy), maxEnergy=Math.max(...validEnergy);
    const torinoValues=[...new Set(records.map(x=>x.torino).filter(Number.isFinite))].sort((a,b)=>a-b);
    $('astCount').textContent=records.length;
    $('astClosest').textContent=max?pct(max.probability):'—';
    $('astMaxDate').textContent=max?max.date:'No probability values';
    $('astFastest').textContent=validEnergy.length?`${fmt(minEnergy,3)}–${fmt(maxEnergy,3)}`:'—';
    $('astNext').textContent=torinoValues.length===1?String(torinoValues[0]):torinoValues.join(', ');
    $('astOverview').innerHTML=`
      <div class="metric"><span>Records with probability values<small class="concept-note">How many rows contain a usable probability number.</small></span><b>${validProb.length} / ${records.length}</b></div>
      <div class="metric"><span>Median individual probability<small class="concept-note">The middle probability when all row values are sorted from low to high.</small></span><b>${pct(median(validProb.map(x=>x.probability)))}</b></div>
      <div class="metric"><span>Highest Palermo Scale value<small class="concept-note">The row with the greatest relative risk compared with background impact risk.</small></span><b>${fmt(Math.max(...records.map(x=>x.palermo).filter(Number.isFinite)),2)}</b></div>
      <div class="metric"><span>Lowest Palermo Scale value<small class="concept-note">The row furthest below background impact risk on the Palermo scale.</small></span><b>${fmt(Math.min(...records.map(x=>x.palermo).filter(Number.isFinite)),2)}</b></div>
      <div class="metric"><span>Records with Torino Scale 0<small class="concept-note">Rows assigned the lowest Torino category: no unusual level of concern.</small></span><b>${records.filter(x=>x.torino===0).length} / ${records.length}</b></div>
      <div class="metric"><span>Impact distance / width<small class="concept-note">How close the modeled path passes Earth and how wide the possible impact corridor is. Not present in this CSV.</small></span><b>Not supplied</b></div>`;
    renderChart();renderRows();
    $('astStatus').textContent=`Loaded ${records.length} records from the local CSV snapshot. No internet connection or NASA API key is needed.`;
    if(!selected) selectRecord(max||sortedByDate[0]);
  }
  function median(values){
    if(!values.length)return NaN;
    const a=[...values].sort((x,y)=>x-y),m=Math.floor(a.length/2);
    return a.length%2?a[m]:(a[m-1]+a[m])/2;
  }
  function renderChart(){
    const top=records.filter(x=>Number.isFinite(x.probability)).sort((a,b)=>b.probability-a.probability).slice(0,10);
    const max=top[0]?.probability||1;
    $('astProbabilityChart').innerHTML=top.map(x=>`
      <div class="ast-prob-row">
        <span class="ast-prob-date">${esc(x.date)}</span>
        <div class="ast-prob-track"><div class="ast-prob-fill" style="width:${Math.max(1,x.probability/max*100)}%"></div></div>
        <b class="ast-prob-value">${pct(x.probability)}</b>
      </div>`).join('');
  }
  function renderRows(){
    const q=$('astSearch').value.trim().toLowerCase(),sort=$('astSort').value;
    const rows=records.filter(x=>x.date.toLowerCase().includes(q));
    rows.sort(sort==='probability'?(a,b)=>(b.probability??-1)-(a.probability??-1):
      sort==='palermo'?(a,b)=>(b.palermo??-Infinity)-(a.palermo??-Infinity):
      (a,b)=>dateKey(a.date).localeCompare(dateKey(b.date)));
    $('astRows').innerHTML=rows.map(x=>`<tr data-date="${esc(x.date)}" class="${selected===x?'selected':''}">
      <td>${esc(x.date)}</td><td class="dist">${pct(x.probability)}</td><td>${fmt(x.energy,3)}</td>
      <td>${fmt(x.palermo,2)}</td><td>${x.torino??'—'}</td></tr>`).join('');
    $('astRows').querySelectorAll('tr').forEach(tr=>tr.addEventListener('click',()=>{
      const x=rows.find(r=>r.date===tr.dataset.date);if(x)selectRecord(x);
    }));
    if(!rows.length)$('astRows').innerHTML='<tr><td colspan="5">No matching dates.</td></tr>';
  }
  function selectRecord(x){
    if(!x)return;selected=x;renderRows();
    $('astDetail').innerHTML=`<h3>Selected impact-monitoring record</h3>
      <div class="big">☄ ${esc(x.date)}</div>
      <div class="metric"><span>Individual impact probability<small class="concept-note">Chance for this one modeled date/solution only; do not add probabilities from different rows.</small></span><b>${pct(x.probability)}</b></div>
      <div class="metric"><span>Impact energy<small class="concept-note">Estimated energy released in a hypothetical impact. Mt = million tons of TNT equivalent.</small></span><b>${fmt(x.energy,3)} Mt</b></div>
      <div class="metric"><span>Palermo Scale<small class="concept-note">A logarithmic technical scale comparing this scenario with the background impact risk. Negative = below background; positive = above background.</small></span><b>${fmt(x.palermo,2)}</b></div>
      <div class="metric"><span>Torino Scale<small class="concept-note">A 0–10 public communication scale. 0 means no unusual concern; higher numbers signal increasing concern.</small></span><b>${x.torino??'Not available'}</b></div>
      <div class="metric"><span>Sigma VI<small class="concept-note">A statistical uncertainty field in the source export. It is not a probability or a stand-alone danger score.</small></span><b>${fmt(x.sigmaVI,4)}</b></div>
      <div class="metric"><span>Distance (Earth radii)<small class="concept-note">Distance expressed in multiples of Earth's radius (about 6,371 km). Missing means the CSV did not provide it.</small></span><b>${esc(x.distance)}</b></div>
      <div class="metric"><span>Impact corridor width<small class="concept-note">Width of the modeled region where an impact solution could pass; not the asteroid's physical diameter.</small></span><b>${esc(x.width)}</b></div>
      <div class="metric"><span>Sigma Impact / Sigma LOV<small class="concept-note">Specialized uncertainty descriptors from the source dataset (impact solution / line of variations). Interpret with the original Sentry documentation, not as direct risk ratings.</small></span><b>${fmt(x.sigmaImpact,3)} / ${fmt(x.sigmaLOV,3)}</b></div>
      <p class="asteroid-note">These values are reproduced from the selected row in your uploaded CSV. Missing fields are not estimated or filled in.</p>`;
  }
  // Initialize immediately so the local data is ready when the panel opens.
  analyze();
})();

(async () => {
  'use strict';
  const dataNode = document.getElementById('astorbCatalogData');
  const searchInput = document.getElementById('orbitSearchInput');
  const searchButton = document.getElementById('orbitSearchBtn');
  const matches = document.getElementById('orbitMatches');
  const searchStatus = document.getElementById('orbitSearchStatus');
  const canvas = document.getElementById('orbitCanvas');
  const slider = document.getElementById('orbitDaySlider');
  const dayValue = document.getElementById('orbitDayValue');
  const playButton = document.getElementById('orbitPlayBtn');
  const facts = document.getElementById('orbitFacts');
  if (!searchInput || !canvas || !slider) return;

  // The catalogue (about 4 MB) loads only when the Asteroid Analyzer is first opened.
  // The single-file build embeds it in <script id="astorbCatalogData">.
  let catalog;
  try {
    if (dataNode) catalog = JSON.parse(dataNode.textContent);
    else {
      await new Promise(resolve => document.getElementById('asteroidOpen').addEventListener('click', resolve, { once: true }));
      searchStatus.textContent = 'Loading the orbital catalog…';
      catalog = await (await fetch('astorb.json')).json();
    }
  } catch (error) {
    searchStatus.textContent = 'The local orbital catalog could not be read.';
    return;
  }
  const AU_K = 0.01720209895; // Gaussian gravitational constant, rad/day for a=1 AU
  const ctx = canvas.getContext('2d');
  let current = null;
  let playing = false;
  let lastFrame = 0;
  let animationId = 0;
  let dayAccumulator = 0;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
  const fmt = (value, digits=3) => Number.isFinite(value)
    ? Number(value).toLocaleString(undefined,{maximumFractionDigits:digits}) : '—';
  const qPeri = r => r[3] * (1-r[4]);
  const qApo = r => r[3] * (1+r[4]);

  function renderMatches(query) {
    const q = query.trim().toLowerCase();
    let found;
    if (!q) {
      found = catalog.slice(0, 20);
    } else {
      const exactItem = catalog.find(item =>
        String(item[0] || '').toLowerCase() === q ||
        String(item[1] || '').toLowerCase() === q
      );
      const starts = [], contains = [];
      for (const item of catalog) {
        if (item === exactItem) continue;
        const id = String(item[0] || '').toLowerCase();
        const name = String(item[1] || '').toLowerCase();
        if (id.startsWith(q) || name.startsWith(q)) starts.push(item);
        else if (id.includes(q) || name.includes(q)) contains.push(item);
        if (starts.length + contains.length >= 80) break;
      }
      found = [...(exactItem ? [exactItem] : []), ...starts, ...contains].slice(0, 30);
    }
    matches.innerHTML = found.map((item, index) =>
      `<option value="${index}">${esc(item[0] ? item[0] + ' ' : '')}${esc(item[1] || 'Unnamed object')} · q ${fmt(qPeri(item),3)} AU</option>`
    ).join('');
    matches._items = found;
    searchStatus.textContent = found.length
      ? `${found.length} matching result(s). Select one to plot its orbit.`
      : 'No matching asteroid found in this filtered catalog.';
    if (found.length === 1) {
      matches.selectedIndex = 0;
      selectRecord(found[0]);
    }
  }

  function search() { renderMatches(searchInput.value); }
  searchButton.addEventListener('click', search);
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); search(); }
  });
  matches.addEventListener('change', () => {
    const item = matches._items?.[matches.selectedIndex];
    if (item) selectRecord(item);
  });

  function solveKepler(meanAnomaly, eccentricity) {
    let E = meanAnomaly;
    for (let i=0; i<12; i++) {
      const f = E - eccentricity*Math.sin(E) - meanAnomaly;
      const fp = 1 - eccentricity*Math.cos(E);
      const step = f/fp;
      E -= step;
      if (Math.abs(step) < 1e-10) break;
    }
    return E;
  }

  function positionAt(item, daysFromEpoch) {
    const [, , , a, e, incDeg, mDeg, wDeg, nodeDeg] = item;
    const mean = (mDeg*Math.PI/180 + AU_K/Math.pow(a,1.5)*daysFromEpoch) % (2*Math.PI);
    const E = solveKepler(mean, e);
    const xOrb = a*(Math.cos(E)-e);
    const yOrb = a*Math.sqrt(1-e*e)*Math.sin(E);
    const inc = incDeg*Math.PI/180, w = wDeg*Math.PI/180, O = nodeDeg*Math.PI/180;
    const cO=Math.cos(O), sO=Math.sin(O), cw=Math.cos(w), sw=Math.sin(w), ci=Math.cos(inc), si=Math.sin(inc);
    return {
      x:(cO*cw-sO*sw*ci)*xOrb + (-cO*sw-sO*cw*ci)*yOrb,
      y:(sO*cw+cO*sw*ci)*xOrb + (-sO*sw+cO*cw*ci)*yOrb,
      z:(sw*si)*xOrb + (cw*si)*yOrb
    };
  }

  function orbitPoint(item, eccentricAnomaly) {
    const [, , , a, e, incDeg, , wDeg, nodeDeg] = item;
    const xOrb = a*(Math.cos(eccentricAnomaly)-e);
    const yOrb = a*Math.sqrt(1-e*e)*Math.sin(eccentricAnomaly);
    const inc=incDeg*Math.PI/180, w=wDeg*Math.PI/180, O=nodeDeg*Math.PI/180;
    const cO=Math.cos(O), sO=Math.sin(O), cw=Math.cos(w), sw=Math.sin(w), ci=Math.cos(inc), si=Math.sin(inc);
    return {
      x:(cO*cw-sO*sw*ci)*xOrb + (-cO*sw-sO*cw*ci)*yOrb,
      y:(sO*cw+cO*sw*ci)*xOrb + (-sO*sw+cO*cw*ci)*yOrb
    };
  }

  function epochDate(item) {
    const text = String(item[9] || '20260917');
    return new Date(Date.UTC(+text.slice(0,4), +text.slice(4,6)-1, +text.slice(6,8)));
  }
  function updateTimeLabel() {
    if (!current) return;
    const days = Number(slider.value);
    const date = epochDate(current);
    date.setUTCDate(date.getUTCDate()+days);
    const dateText = date.toISOString().slice(0,10);
    dayValue.textContent = `${days>0?'+':''}${days.toLocaleString()} days · ${dateText}`;
  }

  function drawOrbit() {
    if (!current || !ctx) return;
    const W=900, H=620, cx=W/2, cy=H/2;
    ctx.clearRect(0,0,W,H);
    const aphelion=qApo(current);
    const maxR=Math.max(1.45,Math.min(12,aphelion*1.08));
    const scale=Math.min((W-90)/(2*maxR),(H-90)/(2*maxR));
    const px=x=>cx+x*scale, py=y=>cy-y*scale;

    // Subtle star field and radial grid
    for(let i=0;i<75;i++){
      const x=(i*137.5+31)%W, y=(i*83.7+19)%H;
      ctx.fillStyle='rgba(190,220,245,.24)';
      ctx.fillRect(x,y,1.4,1.4);
    }
    ctx.strokeStyle='rgba(120,160,190,.13)';
    ctx.lineWidth=1;
    for(let r=1;r<=Math.min(maxR,10);r*=2){
      ctx.beginPath();ctx.arc(cx,cy,r*scale,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='rgba(160,190,215,.65)';
      ctx.font='11px system-ui';ctx.fillText(`${r} AU`,cx+r*scale+5,cy-5);
    }

    // Earth's orbit reference
    ctx.beginPath();ctx.arc(cx,cy,scale,0,Math.PI*2);
    ctx.setLineDash([5,6]);ctx.strokeStyle='rgba(79,174,245,.8)';ctx.lineWidth=1.5;ctx.stroke();ctx.setLineDash([]);

    // Selected asteroid's osculating orbit
    ctx.beginPath();
    for(let j=0;j<=720;j++){
      const p=orbitPoint(current,j/720*Math.PI*2);
      if(j===0)ctx.moveTo(px(p.x),py(p.y));else ctx.lineTo(px(p.x),py(p.y));
    }
    ctx.strokeStyle='#ff9b70';ctx.lineWidth=2.4;ctx.shadowColor='#ff9b70';ctx.shadowBlur=8;ctx.stroke();ctx.shadowBlur=0;

    // Sun
    const glow=ctx.createRadialGradient(cx,cy,2,cx,cy,22);
    glow.addColorStop(0,'#fff7c5');glow.addColorStop(.25,'#ffd15e');glow.addColorStop(1,'rgba(255,166,40,0)');
    ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,22,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#ffe48a';ctx.beginPath();ctx.arc(cx,cy,6,0,Math.PI*2);ctx.fill();

    // Current asteroid location
    const days=Number(slider.value), pos=positionAt(current,days);
    const x=px(pos.x), y=py(pos.y);
    ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fillStyle='rgba(255,139,94,.2)';ctx.fill();
    ctx.beginPath();ctx.arc(x,y,4.5,0,Math.PI*2);ctx.fillStyle='#ff9b70';ctx.fill();
    ctx.strokeStyle='#fff0e8';ctx.lineWidth=1;ctx.stroke();
    ctx.fillStyle='#ffd5c4';ctx.font='13px system-ui';
    const label=`${current[1]} · ${Math.hypot(pos.x,pos.y).toFixed(2)} AU`;
    ctx.fillText(label,Math.min(W-210,Math.max(12,x+12)),Math.max(20,y-12));

    document.getElementById('orbitScaleLabel').textContent =
      `Scale: ±${fmt(maxR,1)} AU${aphelion>12?' · outer orbit clipped':''}`;
  }

  function renderFacts() {
    const [, name, H, a, e, inc, M, w, node, epoch] = current;
    const period=Math.pow(a,1.5);
    facts.innerHTML=`
      <h4>${esc(name || 'Unnamed asteroid')}</h4>
      <div class="orbit-subtitle">${esc(current[0] ? 'Minor-planet number ' + current[0] : 'Provisional designation')} · orbital epoch ${esc(epoch.slice(0,4)+'-'+epoch.slice(4,6)+'-'+epoch.slice(6,8))}</div>
      <div class="orbit-fact-grid">
        <div class="orbit-fact"><span>Perihelion · q</span><b>${fmt(qPeri(current),5)} AU</b><small class="concept-note">Closest point to the Sun along this orbit.</small></div>
        <div class="orbit-fact"><span>Aphelion · Q</span><b>${fmt(qApo(current),5)} AU</b><small class="concept-note">Farthest point from the Sun along this orbit.</small></div>
        <div class="orbit-fact"><span>Semi-major axis · a</span><b>${fmt(a,5)} AU</b><small class="concept-note">Half the longest width of the ellipse; sets the orbit's overall size.</small></div>
        <div class="orbit-fact"><span>Eccentricity · e</span><b>${fmt(e,6)}</b><small class="concept-note">How stretched the orbit is: 0 is a circle; closer to 1 is more elongated.</small></div>
        <div class="orbit-fact"><span>Inclination · i</span><b>${fmt(inc,4)}°</b><small class="concept-note">Tilt of the asteroid's orbital plane relative to Earth's orbital plane.</small></div>
        <div class="orbit-fact"><span>Orbital period · approx.</span><b>${fmt(period,3)} years</b><small class="concept-note">Estimated time for one trip around the Sun, using Kepler's simplified relation.</small></div>
        <div class="orbit-fact"><span>Absolute magnitude · H</span><b>${H==null?'Not supplied':fmt(H,2)}</b><small class="concept-note">A measure of intrinsic brightness; lower H usually means a brighter, often larger object, but size also depends on reflectivity.</small></div>
        <div class="orbit-fact"><span>Mean anomaly · M</span><b>${fmt(M,4)}°</b><small class="concept-note">A time-like angle that tells where the asteroid is in its orbit relative to perihelion at the catalog epoch.</small></div>
        <div class="orbit-fact"><span>Argument of perihelion · ω</span><b>${fmt(w,4)}°</b><small class="concept-note">Orientation angle locating the closest-to-Sun point within the orbital plane.</small></div>
        <div class="orbit-fact"><span>Ascending node · Ω</span><b>${fmt(node,4)}°</b><small class="concept-note">Angle locating where the orbit crosses Earth's reference plane from south to north.</small></div>
      </div>
      <p class="asteroid-note" style="margin-top:12px">The catalog supplies orbital elements, not a photographed asteroid shape. The point shown is its calculated heliocentric position in a simplified Keplerian model.</p>`;
  }

  function selectRecord(item) {
    current=item;
    slider.value='0';
    updateTimeLabel();
    renderFacts();
    drawOrbit();
  }

  slider.addEventListener('input',()=>{ updateTimeLabel();drawOrbit(); });
  playButton.addEventListener('click',()=>{
    playing=!playing;
    playButton.textContent=playing?'Ⅱ Pause animation':'▶ Animate orbit';
    if(playing){lastFrame=0;dayAccumulator=0;animationId=requestAnimationFrame(animate);}
    else {cancelAnimationFrame(animationId);}
  });
  function animate(timestamp) {
    if(!playing)return;
    if(lastFrame){
      const elapsed=Math.min(100,timestamp-lastFrame);
      // Accumulate fractional simulated days. The old code rounded each tiny
      // frame increment to an integer, so most frames added 0 and animation froze.
      dayAccumulator += elapsed * 0.04; // 40 simulated days per real second
      const wholeDays = Math.floor(dayAccumulator);
      if(wholeDays >= 1){
        dayAccumulator -= wholeDays;
        let next=Number(slider.value)+wholeDays;
        if(next>Number(slider.max))next=Number(slider.min)+(next-Number(slider.max)-1);
        slider.value=String(next);
        updateTimeLabel();drawOrbit();
      }
    }
    lastFrame=timestamp;
    animationId=requestAnimationFrame(animate);
  }

  // The catalog is ordered by minor-planet number. Eros is a stable default example.
  const defaultObject=catalog.find(item=>String(item[0])==='433') || catalog[0];
  document.getElementById('orbitTotal').textContent=catalog.length.toLocaleString();
  searchInput.value='Eros';
  renderMatches('Eros');
  if(defaultObject)selectRecord(defaultObject);
  window.addEventListener('resize',drawOrbit);
  document.getElementById('asteroidClose')?.addEventListener('click',()=>{
    playing=false;cancelAnimationFrame(animationId);dayAccumulator=0;lastFrame=0;playButton.textContent='▶ Animate orbit';
  });
})();

/* Live translations for the Sentry dashboard and ASTORB orbit explorer.
   The original English strings are retained so language switching is reversible. */
(() => {
  const Z = {
    "STELLAR · SENTRY DATA ANALYSIS":"STELLAR · 小行星风险数据分析",
    "Asteroid Impact Risk Analyzer":"小行星撞击风险分析器",
    "↻ Recalculate":"↻ 重新计算","✕ Close":"✕ 关闭",
    "Impact-monitoring records":"撞击监测记录","rows in uploaded dataset":"上传数据集中的记录数",
    "Each row is one possible impact date/solution in the saved Sentry export, not necessarily a different asteroid.":"每一行代表 Sentry 数据导出文件中的一个潜在撞击日期／计算解，不一定对应不同的小行星。",
    "Highest listed probability":"最高单条记录概率","The largest probability in any single row. It is not the combined chance across all rows.":"所有记录中单独一行的最高概率，并不是把所有记录合并后的总概率。",
    "Impact energy range":"撞击能量范围","megatonnes (Mt)":"百万吨（Mt）",
    "Estimated energy if an impact occurred; 1 Mt is equivalent to one million tons of TNT.":"假设发生撞击时估算释放的能量；1 Mt 相当于一百万吨 TNT 的能量。",
    "Torino Scale":"都灵等级","all records in this file":"此文件中的全部记录",
    "A public 0–10 hazard communication scale. 0 means no unusual level of concern; higher values indicate greater concern.":"面向公众的 0–10 级风险沟通尺度。0 表示没有异常关注等级；数值越高，代表需要关注的程度越高。",
    "Highest individual impact probabilities":"单条记录中最高的撞击概率",
    "Top 10 records ranked by the probability listed for each date. Probabilities are not added together.":"按照每个日期对应的概率排列前 10 条记录。不同记录的概率不会相加。",
    "Probability":"概率","means the estimated chance for the specific impact scenario shown in one row. A value such as 0.01% is a one-in-10,000 chance for that scenario; it is not a prediction that an impact will happen.":"表示该行所描述的特定撞击情景的估算可能性。例如 0.01% 表示该情景约为万分之一；这并不代表撞击一定会发生。",
    "Dataset overview":"数据集概览","Quick definitions:":"快速概念解释：","median":"中位数","is the middle value after sorting;":"将数据排序后位于中间位置的数值；","Palermo Scale":"帕勒莫等级","compares a scenario's risk with the background risk from objects of similar size.":"将某个情景的风险与类似大小天体所带来的背景撞击风险进行比较。",
    "The uploaded file does not include an asteroid name or usable Earth-distance / impact-width values. Those fields are intentionally shown as unavailable. Palermo values are logarithmic comparisons with background risk; Torino values are a separate 0–10 public communication scale.":"上传的文件不包含小行星名称，也没有可用的地球距离／撞击走廊宽度数据，因此这些字段会显示为不可用。帕勒莫数值是与背景风险进行比较的对数指标；都灵等级则是独立的 0–10 级公众沟通尺度。",
    "Date: earliest first":"日期：从最早开始","Probability: highest first":"概率：从高到低","Palermo: highest first":"帕勒莫等级：从高到低",
    "Search date…":"搜索日期…","Search impact date":"搜索撞击日期","Loading saved Sentry dataset…":"正在加载已保存的 Sentry 数据集…",
    "How to read the columns:":"如何理解表格中的列：","Potential impact date":"潜在撞击日期","= the modeled date of a possible encounter;":"= 模型计算出的潜在近距离交会日期；","= chance for that row's scenario;":"= 该行所对应情景发生的概率；","Energy (Mt)":"能量（Mt）","= estimated impact energy;":"= 估算的撞击能量；","Palermo":"帕勒莫等级","= technical comparison against background impact risk (negative values are below background);":"= 与背景撞击风险进行技术比较（负值表示低于背景风险）；","Torino":"都灵等级","= 0–10 public hazard scale. Click a row to see more fields.":"= 0–10 级公众风险尺度。点击某一行可查看更多字段。",
    "Source: user-provided “Sentry Earth Impact Monitoring” CSV. Date values retain the source's yyyy-mm-dd.dd format.":"数据来源：用户提供的 “Sentry Earth Impact Monitoring” CSV 文件。日期保留原始 yyyy-mm-dd.dd 格式。",
    "Selected record":"选中的记录","Select a row to inspect its values.":"选择一行以查看详细数值。",
    "Scientific note:":"科学说明：",
    " This is an analysis of a saved Sentry monitoring export, not a live risk assessment. Each probability belongs to an individual listed date/solution. Do not sum the probabilities: the records may be related solutions for the same object. A Torino Scale of 0 means the listed scenario is below the scale's threshold for concern; it does not mean the object has zero probability. The CSV does not identify the asteroid, so this dashboard does not assign it a name.":" 这是对已保存的 Sentry 监测数据导出文件进行的分析，并非实时风险评估。每个概率值对应一个单独列出的日期／计算解。请勿将这些概率相加：这些记录可能是同一小行星的相关计算解。都灵等级为 0 表示所列情景低于该等级的关注阈值，并不代表该天体的概率为零。CSV 文件没有标明小行星的身份，因此此仪表板不会为其指定名称。",
    "No matching dates.":"没有找到符合条件的日期。",
    "Records with probability values":"包含概率数据的记录数","How many rows contain a usable probability number.":"包含有效概率数值的记录行数。",
    "Median individual probability":"单条概率的中位数","The middle probability when all row values are sorted from low to high.":"将所有记录的概率从低到高排列后，位于中间的数值。",
    "Highest Palermo Scale value":"最高帕勒莫等级数值","The row with the greatest relative risk compared with background impact risk.":"相对于背景撞击风险，风险比较值最高的那一行。",
    "Lowest Palermo Scale value":"最低帕勒莫等级数值","The row furthest below background impact risk on the Palermo scale.":"在帕勒莫尺度上，低于背景撞击风险最多的那一行。",
    "Records with Torino Scale 0":"都灵等级为 0 的记录数","Rows assigned the lowest Torino category: no unusual level of concern.":"被归为最低都灵等级的记录行数，表示没有异常关注等级。",
    "Impact distance / width":"撞击距离／走廊宽度","How close the modeled path passes Earth and how wide the possible impact corridor is. Not present in this CSV.":"模型轨迹与地球的距离，以及潜在撞击走廊的宽度。此 CSV 未提供这些数据。",
    "Not supplied":"未提供","Not available":"不可用",
    "Loaded ":"已加载 "," records from the local CSV snapshot. No internet connection or NASA API key is needed.":" 条记录，数据来自本地 CSV 快照。无需联网或 NASA API 密钥。",
    "Individual impact probability":"单次情景撞击概率","Chance for this one modeled date/solution only; do not add probabilities from different rows.":"仅指当前这一条日期／计算解对应的概率；不要将不同记录的概率相加。",
    "Impact energy":"撞击能量","Estimated energy released in a hypothetical impact. Mt = million tons of TNT equivalent.":"假设发生撞击时估算释放的能量。Mt = TNT 当量百万吨。",
    "A logarithmic technical scale comparing this scenario with the background impact risk. Negative = below background; positive = above background.":"一种对数技术尺度，用来比较当前情景与背景撞击风险。负值表示低于背景风险；正值表示高于背景风险。",
    "A 0–10 public communication scale. 0 means no unusual concern; higher numbers signal increasing concern.":"面向公众的 0–10 级沟通尺度。0 表示没有异常关注；数值越高，关注程度越高。",
    "A statistical uncertainty field in the source export. It is not a probability or a stand-alone danger score.":"源数据中的统计不确定性字段。它不是概率，也不能单独作为危险程度评分。",
    "Distance expressed in multiples of Earth's radius (about 6,371 km). Missing means the CSV did not provide it.":"以地球半径为单位表示的距离（地球半径约为 6,371 千米）。若缺失，表示 CSV 没有提供该数据。",
    "Width of the modeled region where an impact solution could pass; not the asteroid's physical diameter.":"模型中可能出现撞击解的区域宽度；并不是小行星本身的直径。",
    "Specialized uncertainty descriptors from the source dataset (impact solution / line of variations). Interpret with the original Sentry documentation, not as direct risk ratings.":"源数据中的专业不确定性描述（撞击解／变分线）。应结合 Sentry 原始文档理解，不能将其视为直接的风险等级。",
    "These values are reproduced from the selected row in your uploaded CSV. Missing fields are not estimated or filled in.":"这些数值直接来自你上传的 CSV 中所选的记录。缺失字段不会被估算或补填。",
    "Selected impact-monitoring record":"选中的撞击监测记录",
    "Impact corridor width":"撞击走廊宽度","Sigma VI":"Sigma VI（不确定性指标）","Distance (Earth radii)":"距离（地球半径）","Sigma Impact / Sigma LOV":"Sigma Impact / Sigma LOV（不确定性指标）"
  };
  const E = {
    "STELLAR · SENTRY DATA ANALYSIS":"STELLAR · ANÁLISIS DE DATOS DE RIESGO",
    "Asteroid Impact Risk Analyzer":"Analizador del riesgo de impacto de asteroides",
    "↻ Recalculate":"↻ Recalcular","✕ Close":"✕ Cerrar",
    "Impact-monitoring records":"Registros de vigilancia de impactos","rows in uploaded dataset":"filas en el conjunto de datos",
    "Each row is one possible impact date/solution in the saved Sentry export, not necessarily a different asteroid.":"Cada fila representa una posible fecha/solución de impacto del archivo Sentry guardado; no necesariamente corresponde a un asteroide diferente.",
    "Highest listed probability":"Probabilidad individual más alta","The largest probability in any single row. It is not the combined chance across all rows.":"La probabilidad más alta de una sola fila. No es la probabilidad combinada de todas las filas.",
    "Impact energy range":"Rango de energía de impacto","megatonnes (Mt)":"megatones (Mt)",
    "Estimated energy if an impact occurred; 1 Mt is equivalent to one million tons of TNT.":"Energía estimada si ocurriera un impacto; 1 Mt equivale a un millón de toneladas de TNT.",
    "Torino Scale":"Escala de Turín","all records in this file":"todos los registros de este archivo",
    "A public 0–10 hazard communication scale. 0 means no unusual level of concern; higher values indicate greater concern.":"Escala pública de comunicación del riesgo de 0 a 10. El 0 indica que no hay un nivel inusual de preocupación; los valores más altos indican mayor preocupación.",
    "Highest individual impact probabilities":"Probabilidades individuales de impacto más altas",
    "Top 10 records ranked by the probability listed for each date. Probabilities are not added together.":"Los 10 registros principales ordenados por la probabilidad indicada para cada fecha. Las probabilidades no se suman.",
    "Probability":"Probabilidad","means the estimated chance for the specific impact scenario shown in one row. A value such as 0.01% is a one-in-10,000 chance for that scenario; it is not a prediction that an impact will happen.":"es la posibilidad estimada del escenario de impacto específico de una fila. Por ejemplo, 0.01% equivale a una posibilidad entre 10,000 para ese escenario; no predice que el impacto vaya a ocurrir.",
    "Dataset overview":"Resumen del conjunto de datos","Quick definitions:":"Definiciones rápidas:","median":"mediana","is the middle value after sorting;":"es el valor central después de ordenar los datos;","Palermo Scale":"Escala de Palermo","compares a scenario's risk with the background risk from objects of similar size.":"compara el riesgo de un escenario con el riesgo de fondo de objetos de tamaño similar.",
    "The uploaded file does not include an asteroid name or usable Earth-distance / impact-width values. Those fields are intentionally shown as unavailable. Palermo values are logarithmic comparisons with background risk; Torino values are a separate 0–10 public communication scale.":"El archivo no incluye el nombre del asteroide ni valores utilizables de distancia a la Tierra o anchura del corredor de impacto. Esos campos aparecen como no disponibles. Los valores de Palermo son comparaciones logarítmicas con el riesgo de fondo; la escala de Turín es una escala pública independiente de 0 a 10.",
    "Date: earliest first":"Fecha: primero la más antigua","Probability: highest first":"Probabilidad: de mayor a menor","Palermo: highest first":"Palermo: de mayor a menor",
    "Search date…":"Buscar fecha…","Search impact date":"Buscar fecha de impacto","Loading saved Sentry dataset…":"Cargando el conjunto de datos Sentry guardado…",
    "How to read the columns:":"Cómo leer las columnas:","Potential impact date":"Fecha de posible impacto","= the modeled date of a possible encounter;":"= fecha modelada de un posible encuentro;","= chance for that row's scenario;":"= probabilidad del escenario de esa fila;","Energy (Mt)":"Energía (Mt)","= estimated impact energy;":"= energía de impacto estimada;","Palermo":"Palermo","= technical comparison against background impact risk (negative values are below background);":"= comparación técnica con el riesgo de impacto de fondo (los valores negativos están por debajo del riesgo de fondo);","Torino":"Turín","= 0–10 public hazard scale. Click a row to see more fields.":"= escala pública de riesgo de 0 a 10. Haz clic en una fila para ver más campos.",
    "Source: user-provided “Sentry Earth Impact Monitoring” CSV. Date values retain the source's yyyy-mm-dd.dd format.":"Fuente: archivo CSV “Sentry Earth Impact Monitoring” proporcionado por el usuario. Las fechas conservan el formato original yyyy-mm-dd.dd.",
    "Selected record":"Registro seleccionado","Select a row to inspect its values.":"Selecciona una fila para consultar sus valores.",
    "Scientific note:":"Nota científica:",
    " This is an analysis of a saved Sentry monitoring export, not a live risk assessment. Each probability belongs to an individual listed date/solution. Do not sum the probabilities: the records may be related solutions for the same object. A Torino Scale of 0 means the listed scenario is below the scale's threshold for concern; it does not mean the object has zero probability. The CSV does not identify the asteroid, so this dashboard does not assign it a name.":" Este análisis utiliza una exportación guardada de los datos de vigilancia Sentry; no es una evaluación del riesgo en tiempo real. Cada probabilidad corresponde a una fecha/solución individual de la lista. No sumes las probabilidades: los registros pueden ser soluciones relacionadas con un mismo objeto. Un valor de 0 en la escala de Turín significa que el escenario indicado está por debajo del umbral de preocupación de la escala; no significa que la probabilidad del objeto sea cero. El archivo CSV no identifica el asteroide, por lo que este panel no le asigna ningún nombre.",
    "No matching dates.":"No se encontraron fechas coincidentes.",
    "Records with probability values":"Registros con valores de probabilidad","How many rows contain a usable probability number.":"Cantidad de filas que contienen un valor de probabilidad válido.",
    "Median individual probability":"Mediana de la probabilidad individual","The middle probability when all row values are sorted from low to high.":"La probabilidad central al ordenar todos los valores de menor a mayor.",
    "Highest Palermo Scale value":"Valor más alto de la escala de Palermo","The row with the greatest relative risk compared with background impact risk.":"La fila con el mayor riesgo relativo en comparación con el riesgo de impacto de fondo.",
    "Lowest Palermo Scale value":"Valor más bajo de la escala de Palermo","The row furthest below background impact risk on the Palermo scale.":"La fila que queda más por debajo del riesgo de impacto de fondo según la escala de Palermo.",
    "Records with Torino Scale 0":"Registros con nivel 0 en la escala de Turín","Rows assigned the lowest Torino category: no unusual level of concern.":"Filas asignadas a la categoría más baja de Turín: sin un nivel inusual de preocupación.",
    "Impact distance / width":"Distancia / anchura del impacto","How close the modeled path passes Earth and how wide the possible impact corridor is. Not present in this CSV.":"Indica a qué distancia pasa de la Tierra la trayectoria modelada y cuál sería la anchura del posible corredor de impacto. Este CSV no contiene esos datos.",
    "Not supplied":"No proporcionado","Not available":"No disponible",
    "Loaded ":"Cargados "," records from the local CSV snapshot. No internet connection or NASA API key is needed.":" registros desde la copia local del CSV. No se necesita conexión a Internet ni una clave de la API de NASA.",
    "Individual impact probability":"Probabilidad individual de impacto","Chance for this one modeled date/solution only; do not add probabilities from different rows.":"Probabilidad correspondiente únicamente a esta fecha/solución modelada; no sumes probabilidades de filas diferentes.",
    "Impact energy":"Energía de impacto","Estimated energy released in a hypothetical impact. Mt = million tons of TNT equivalent.":"Energía estimada liberada en un impacto hipotético. Mt = equivalente a millones de toneladas de TNT.",
    "A logarithmic technical scale comparing this scenario with the background impact risk. Negative = below background; positive = above background.":"Escala técnica logarítmica que compara este escenario con el riesgo de impacto de fondo. Negativo = por debajo del riesgo de fondo; positivo = por encima.",
    "A 0–10 public communication scale. 0 means no unusual concern; higher numbers signal increasing concern.":"Escala pública de comunicación de 0 a 10. El 0 indica que no hay una preocupación inusual; los números más altos indican mayor preocupación.",
    "A statistical uncertainty field in the source export. It is not a probability or a stand-alone danger score.":"Campo de incertidumbre estadística del archivo original. No es una probabilidad ni una puntuación de peligro independiente.",
    "Distance expressed in multiples of Earth's radius (about 6,371 km). Missing means the CSV did not provide it.":"Distancia expresada en múltiplos del radio terrestre (unos 6,371 km). Si falta, significa que el CSV no la proporcionó.",
    "Width of the modeled region where an impact solution could pass; not the asteroid's physical diameter.":"Anchura de la región modelada por la que podría pasar una solución de impacto; no es el diámetro físico del asteroide.",
    "Specialized uncertainty descriptors from the source dataset (impact solution / line of variations). Interpret with the original Sentry documentation, not as direct risk ratings.":"Descriptores especializados de incertidumbre del conjunto original (solución de impacto / línea de variaciones). Deben interpretarse con la documentación original de Sentry, no como clasificaciones directas de riesgo.",
    "These values are reproduced from the selected row in your uploaded CSV. Missing fields are not estimated or filled in.":"Estos valores se reproducen de la fila seleccionada del CSV que subiste. Los campos ausentes no se estiman ni se completan.",
    "Selected impact-monitoring record":"Registro de vigilancia de impacto seleccionado",
    "Impact corridor width":"Anchura del corredor de impacto","Sigma VI":"Sigma VI (indicador de incertidumbre)","Distance (Earth radii)":"Distancia (radios terrestres)","Sigma Impact / Sigma LOV":"Sigma Impact / Sigma LOV (indicadores de incertidumbre)"
  };
  const orbitZ = {
    "NEO candidates":"近地天体候选对象","Search asteroid by name or number":"按小行星名称或编号搜索","Search":"搜索","e.g. Eros or 433":"例如 Eros 或 433",
    "Showing the closest matches. Select a result to plot its orbit.":"显示最接近的匹配结果。选择一项以绘制其轨道。",
    "Time from orbital epoch":"距轨道历元的时间","days":"天","−10 years":"−10 年","+10 years":"+10 年",
    "▶ Animate orbit":"▶ 播放轨道动画","Ⅱ Pause animation":"Ⅱ 暂停动画",
    "HELICENTRIC ORBIT · TOP VIEW":"日心轨道 · 俯视图","Scale: AU":"比例尺：AU",
    "How to read this map:":"如何阅读这张轨道图：",
    "The Sun is at the center. The blue dashed circle is Earth's 1 AU orbit. The orange curve is the selected asteroid's calculated orbit; the orange dot is its position at the chosen date.":"太阳位于中心。蓝色虚线圆表示地球的 1 AU 轨道。橙色曲线是所选小行星的计算轨道；橙色圆点表示所选日期时它的位置。",
    "AU":"AU","(astronomical unit) is the average Earth–Sun distance, about 150 million km. This is a top-down 2D view, so inclination above/below Earth's orbital plane is not visible here.":"（天文单位）是地球与太阳之间的平均距离，约 1.5 亿千米。这是二维俯视图，因此无法显示轨道相对于地球轨道平面的上下倾斜。",
    "Sun":"太阳","Earth's orbit (1 AU)":"地球轨道（1 AU）","Selected asteroid":"所选小行星","Asteroid orbit":"小行星轨道",
    "Choose an asteroid to inspect its orbital elements.":"选择一颗小行星以查看它的轨道参数。",
    "Move the slider to calculate the asteroid's approximate position before or after the catalog reference date. The animation advances simulated days, not real-time days.":"移动滑块可计算小行星在目录参考日期之前或之后的大致位置。动画推进的是模拟时间中的天数，而不是真实经过的天数。",
    "Why are these called NEO candidates?":"为什么称为近地天体候选对象？",
    "This local subset was selected using perihelion distance q < 1.3 AU. That means the orbit comes within 1.3 times Earth's average distance from the Sun at its closest point. It is a catalog filter, not proof of an Earth crossing or collision risk.":"这个本地数据子集根据近日点距离 q < 1.3 AU 筛选。这表示小行星轨道距离太阳最近时，距太阳小于地日平均距离的 1.3 倍。这只是目录筛选条件，并不代表它一定会穿越地球轨道或存在撞击风险。",
    "STELLAR · ASTORB CATALOG":"STELLAR · ASTORB 小行星目录",
    "The plotted path is calculated from the catalog's osculating Keplerian elements at epoch 2026-09-17. It is a two-body approximation, not an N-body ephemeris; it does not include planetary perturbations or predict an Earth impact. The catalog's perihelion-distance filter q < 1.3 AU is used to select near-Earth-object candidates. It does not mean these objects are on a collision course.":"图中轨迹根据目录中 2026-09-17 历元的瞬时开普勒轨道参数计算。这是二体近似模型，不是多体星历；没有考虑行星摄动，也不能预测地球撞击。目录使用近日点距离 q < 1.3 AU 筛选近地天体候选对象，但这不代表这些天体正处于与地球相撞的轨道上。",
    "Data: Lowell Observatory's astorb.dat. Catalog attribution: Lowell Observatory endowment and NASA PDART grant NNX16AG52G. ":"数据来源：Lowell Observatory 的 astorb.dat。目录致谢：Lowell Observatory endowment 和 NASA PDART grant NNX16AG52G。",
    "Model limitations:":"模型局限：","About the astorb database":"关于 astorb 数据库",
    "Perihelion · q":"近日点 · q","Closest point to the Sun along this orbit.":"沿此轨道距离太阳最近的位置。",
    "Aphelion · Q":"远日点 · Q","Farthest point from the Sun along this orbit.":"沿此轨道距离太阳最远的位置。",
    "Semi-major axis · a":"半长轴 · a","Half the longest width of the ellipse; sets the orbit's overall size.":"椭圆最长直径的一半；决定轨道整体大小。",
    "Eccentricity · e":"离心率 · e","How stretched the orbit is: 0 is a circle; closer to 1 is more elongated.":"表示轨道有多扁：0 代表圆形，越接近 1 越狭长。",
    "Inclination · i":"轨道倾角 · i","Tilt of the asteroid's orbital plane relative to Earth's orbital plane.":"小行星轨道平面相对于地球轨道平面的倾斜角度。",
    "Orbital period · approx.":"公转周期 · 约","Estimated time for one trip around the Sun, using Kepler's simplified relation.":"根据简化的开普勒关系估算绕太阳一周所需的时间。",
    "Absolute magnitude · H":"绝对星等 · H","A measure of intrinsic brightness; lower H usually means a brighter, often larger object, but size also depends on reflectivity.":"衡量天体固有亮度的指标；H 值越低通常表示天体越亮、也可能越大，但实际大小还取决于表面反射率。",
    "Mean anomaly · M":"平近点角 · M","A time-like angle that tells where the asteroid is in its orbit relative to perihelion at the catalog epoch.":"类似时间位置的角度，用于表示在目录历元时，小行星相对于近日点位于轨道的什么位置。",
    "Argument of perihelion · ω":"近日点幅角 · ω","Orientation angle locating the closest-to-Sun point within the orbital plane.":"用于确定轨道平面内近日点方向的角度。",
    "Ascending node · Ω":"升交点经度 · Ω","Angle locating where the orbit crosses Earth's reference plane from south to north.":"表示轨道从南向北穿过地球参考轨道平面位置的角度。",
    "The catalog supplies orbital elements, not a photographed asteroid shape. The point shown is its calculated heliocentric position in a simplified Keplerian model.":"该目录提供的是轨道参数，而不是小行星的真实照片或形状。图中的点是通过简化的开普勒模型计算出的日心位置。",
    "Unnamed asteroid":"未命名小行星","Minor-planet number ":"小行星编号 ","Provisional designation":"临时编号",
    "The local orbital catalog could not be read.":"无法读取本地轨道目录。","No matching asteroid found in this filtered catalog.":"在筛选后的目录中没有找到匹配的小行星。",
    "matching result(s). Select one to plot its orbit.":"个匹配结果。选择一项以绘制轨道。"
  };
  const orbitE = {
    "NEO candidates":"candidatos NEO","Search asteroid by name or number":"Buscar asteroide por nombre o número","Search":"Buscar","e.g. Eros or 433":"Por ejemplo, Eros o 433",
    "Showing the closest matches. Select a result to plot its orbit.":"Se muestran las coincidencias más cercanas. Selecciona un resultado para dibujar su órbita.",
    "Time from orbital epoch":"Tiempo desde la época orbital","days":"días","−10 years":"−10 años","+10 years":"+10 años",
    "▶ Animate orbit":"▶ Animar órbita","Ⅱ Pause animation":"Ⅱ Pausar animación",
    "HELICENTRIC ORBIT · TOP VIEW":"ÓRBITA HELIOCÉNTRICA · VISTA SUPERIOR","Scale: AU":"Escala: AU",
    "How to read this map:":"Cómo leer este mapa:",
    "The Sun is at the center. The blue dashed circle is Earth's 1 AU orbit. The orange curve is the selected asteroid's calculated orbit; the orange dot is its position at the chosen date.":"El Sol está en el centro. El círculo azul discontinuo representa la órbita terrestre de 1 AU. La curva naranja es la órbita calculada del asteroide seleccionado; el punto naranja indica su posición en la fecha elegida.",
    "AU":"AU","(astronomical unit) is the average Earth–Sun distance, about 150 million km. This is a top-down 2D view, so inclination above/below Earth's orbital plane is not visible here.":"(unidad astronómica) es la distancia media entre la Tierra y el Sol, unos 150 millones de km. Es una vista 2D desde arriba, por lo que aquí no se aprecia la inclinación por encima o debajo del plano orbital terrestre.",
    "Sun":"Sol","Earth's orbit (1 AU)":"Órbita terrestre (1 AU)","Selected asteroid":"Asteroide seleccionado","Asteroid orbit":"Órbita del asteroide",
    "Choose an asteroid to inspect its orbital elements.":"Elige un asteroide para consultar sus elementos orbitales.",
    "Move the slider to calculate the asteroid's approximate position before or after the catalog reference date. The animation advances simulated days, not real-time days.":"Mueve el control deslizante para calcular la posición aproximada del asteroide antes o después de la fecha de referencia del catálogo. La animación avanza días simulados, no días en tiempo real.",
    "Why are these called NEO candidates?":"¿Por qué se llaman candidatos NEO?",
    "This local subset was selected using perihelion distance q < 1.3 AU. That means the orbit comes within 1.3 times Earth's average distance from the Sun at its closest point. It is a catalog filter, not proof of an Earth crossing or collision risk.":"Este subconjunto se filtró usando una distancia de perihelio q < 1.3 AU. Esto significa que, en su punto más cercano al Sol, la órbita queda a menos de 1.3 veces la distancia media entre la Tierra y el Sol. Es un filtro del catálogo, no una prueba de cruce con la órbita terrestre ni de riesgo de colisión.",
    "STELLAR · ASTORB CATALOG":"STELLAR · CATÁLOGO ASTORB",
    "The plotted path is calculated from the catalog's osculating Keplerian elements at epoch 2026-09-17. It is a two-body approximation, not an N-body ephemeris; it does not include planetary perturbations or predict an Earth impact. The catalog's perihelion-distance filter q < 1.3 AU is used to select near-Earth-object candidates. It does not mean these objects are on a collision course.":"La trayectoria se calcula a partir de los elementos keplerianos osculantes del catálogo en la época 2026-09-17. Es una aproximación de dos cuerpos, no una efeméride de N cuerpos; no incluye perturbaciones planetarias ni predice impactos contra la Tierra. El filtro de distancia de perihelio q < 1.3 AU selecciona candidatos a objetos cercanos a la Tierra, pero no significa que estén en trayectoria de colisión con nuestro planeta.",
    "Data: Lowell Observatory's astorb.dat. Catalog attribution: Lowell Observatory endowment and NASA PDART grant NNX16AG52G. ":"Datos: astorb.dat del Lowell Observatory. Atribución del catálogo: Lowell Observatory endowment y la subvención NASA PDART NNX16AG52G. ",
    "Model limitations:":"Limitaciones del modelo:","About the astorb database":"Acerca de la base de datos astorb",
    "Perihelion · q":"Perihelio · q","Closest point to the Sun along this orbit.":"Punto de esta órbita más cercano al Sol.",
    "Aphelion · Q":"Afelio · Q","Farthest point from the Sun along this orbit.":"Punto de esta órbita más alejado del Sol.",
    "Semi-major axis · a":"Semieje mayor · a","Half the longest width of the ellipse; sets the orbit's overall size.":"La mitad del diámetro más largo de la elipse; determina el tamaño general de la órbita.",
    "Eccentricity · e":"Excentricidad · e","How stretched the orbit is: 0 is a circle; closer to 1 is more elongated.":"Indica cuánto se alarga la órbita: 0 es un círculo; cuanto más se acerca a 1, más alargada es.",
    "Inclination · i":"Inclinación · i","Tilt of the asteroid's orbital plane relative to Earth's orbital plane.":"Inclinación del plano orbital del asteroide con respecto al plano orbital terrestre.",
    "Orbital period · approx.":"Período orbital · aprox.","Estimated time for one trip around the Sun, using Kepler's simplified relation.":"Tiempo estimado para completar una vuelta alrededor del Sol mediante la relación simplificada de Kepler.",
    "Absolute magnitude · H":"Magnitud absoluta · H","A measure of intrinsic brightness; lower H usually means a brighter, often larger object, but size also depends on reflectivity.":"Medida del brillo intrínseco; un valor H menor suele indicar un objeto más brillante y posiblemente más grande, aunque el tamaño también depende de la reflectividad.",
    "Mean anomaly · M":"Anomalía media · M","A time-like angle that tells where the asteroid is in its orbit relative to perihelion at the catalog epoch.":"Ángulo relacionado con el tiempo que indica dónde se encuentra el asteroide en su órbita con respecto al perihelio en la época del catálogo.",
    "Argument of perihelion · ω":"Argumento del perihelio · ω","Orientation angle locating the closest-to-Sun point within the orbital plane.":"Ángulo de orientación que ubica el punto más cercano al Sol dentro del plano orbital.",
    "Ascending node · Ω":"Longitud del nodo ascendente · Ω","Angle locating where the orbit crosses Earth's reference plane from south to north.":"Ángulo que indica dónde la órbita cruza el plano de referencia terrestre de sur a norte.",
    "The catalog supplies orbital elements, not a photographed asteroid shape. The point shown is its calculated heliocentric position in a simplified Keplerian model.":"El catálogo proporciona elementos orbitales, no una fotografía ni la forma real del asteroide. El punto mostrado es su posición heliocéntrica calculada mediante un modelo kepleriano simplificado.",
    "Unnamed asteroid":"Asteroide sin nombre","Minor-planet number ":"Número de planeta menor ","Provisional designation":"Designación provisional",
    "The local orbital catalog could not be read.":"No se pudo leer el catálogo orbital local.","No matching asteroid found in this filtered catalog.":"No se encontró ningún asteroide coincidente en este catálogo filtrado.",
    "matching result(s). Select one to plot its orbit.":" resultado(s). Selecciona uno para dibujar su órbita."
  };
  const roots = [document.getElementById('asteroidApp'), document.querySelector('.orbit-explorer')].filter(Boolean);
  const originalText = new WeakMap(), originalAttrs = new WeakMap();
  const lang = () => document.documentElement.dataset.lang || 'en';
  const dict = () => lang()==='zh' ? {...Z,...orbitZ} : lang()==='es' ? {...E,...orbitE} : {};
  function translateText(node) {
    if (!originalText.has(node)) originalText.set(node,node.nodeValue);
    const source=originalText.get(node), d=dict();
    const trimmed=source.trim();
    const translated=d[trimmed];
    let result=translated===undefined ? source : source.slice(0,source.indexOf(trimmed))+translated+source.slice(source.indexOf(trimmed)+trimmed.length);
    // Dynamic fragments emitted by the dashboard/orbit search.
    const lead=result.match(/^\s*/)?.[0] || '', tail=result.match(/\s*$/)?.[0] || '';
    let core=result.trim();
    if (lang()==='zh') {
      core=core.replace(/^Epoch: /, '历元：');
      core=core.replace(/^Loaded (\d+) records from the local CSV snapshot\. No internet connection or NASA API key is needed\.$/, '已从本地 CSV 快照加载 $1 条记录。无需联网或 NASA API 密钥。');
      core=core.replace(/^(\d+) matching result\(s\)\. Select one to plot its orbit\.$/, '$1 个匹配结果。选择一项以绘制轨道。');
      core=core.replace(/^(\d+) days · (.+)$/, '$1 天 · $2');
      core=core.replace(/^(\+\d+|\-\d+) days · (.+)$/, '$1 天 · $2');
    } else if (lang()==='es') {
      core=core.replace(/^Epoch: /, 'Época: ');
      core=core.replace(/^Loaded (\d+) records from the local CSV snapshot\. No internet connection or NASA API key is needed\.$/, 'Se cargaron $1 registros desde la copia local del CSV. No se necesita conexión a Internet ni una clave de la API de NASA.');
      core=core.replace(/^(\d+) matching result\(s\)\. Select one to plot its orbit\.$/, '$1 resultado(s). Selecciona uno para dibujar su órbita.');
      core=core.replace(/^(\+\d+|\-\d+) days · (.+)$/, '$1 días · $2');
      core=core.replace(/^(\d+) days · (.+)$/, '$1 días · $2');
    }
    if (lang()==='zh') {
      core=core.replace(/^Minor-planet number (.+) · orbital epoch (.+)$/, '小行星编号 $1 · 轨道历元 $2');
      core=core.replace(/^Provisional designation · orbital epoch (.+)$/, '临时编号 · 轨道历元 $1');
      core=core.replace(/^(\d+(?:\.\d+)?) years$/, '$1 年');
      core=core.replace(/^(\d+(?:\.\d+)?) AU$/, '$1 AU');
      core=core.replace(/^q (\d+(?:\.\d+)?) AU$/, '近日点 q：$1 AU');
    } else if (lang()==='es') {
      core=core.replace(/^Minor-planet number (.+) · orbital epoch (.+)$/, 'Número de planeta menor $1 · época orbital $2');
      core=core.replace(/^Provisional designation · orbital epoch (.+)$/, 'Designación provisional · época orbital $1');
      core=core.replace(/^(\d+(?:\.\d+)?) years$/, '$1 años');
      core=core.replace(/^(\d+(?:\.\d+)?) AU$/, '$1 AU');
      core=core.replace(/^q (\d+(?:\.\d+)?) AU$/, 'Perihelio q: $1 AU');
    }
    result=lead+core+tail;
    if (node.nodeValue!==result) node.nodeValue=result;
  }
  function translateAttr(el,name) {
    if (!originalAttrs.has(el)) originalAttrs.set(el,{});
    const store=originalAttrs.get(el);
    if (!(name in store)) store[name]=el.getAttribute(name);
    const source=store[name], d=dict();
    if (!source) return;
    const result=d[source] ?? source;
    if (el.getAttribute(name)!==result) el.setAttribute(name,result);
  }
  function walk(root) {
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let n; while((n=walker.nextNode())) translateText(n);
    root.querySelectorAll('*').forEach(el=>['placeholder','aria-label','title'].forEach(a=>translateAttr(el,a)));
  }
  roots.forEach(walk);
  const mo=new MutationObserver(records=>{
    for(const rec of records){
      if(rec.type==='childList') rec.addedNodes.forEach(n=>{ if(n.nodeType===Node.TEXT_NODE) translateText(n); else if(n.nodeType===Node.ELEMENT_NODE) {translateTextTree(n); n.querySelectorAll?.('*').forEach(el=>['placeholder','aria-label','title'].forEach(a=>translateAttr(el,a)));} });
    }
  });
  function translateTextTree(root){ const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))translateText(n); }
  roots.forEach(root=>mo.observe(root,{childList:true,subtree:true}));
  const langObserver=new MutationObserver(()=>roots.forEach(walk));
  langObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-lang']});
  // Translate dropdown options and search controls outside the main dashboard.
  const extraAttrs=['#astSearch','#astSort','#orbitSearchInput','#orbitSearchBtn','#orbitMatches','#orbitDaySlider','#orbitPlayBtn'];
  const attrObserver=new MutationObserver(()=>extraAttrs.forEach(sel=>{const el=document.querySelector(sel);if(el){['placeholder','aria-label','title'].forEach(a=>translateAttr(el,a));if(el.tagName==='SELECT')Array.from(el.options).forEach(o=>translateText(o.firstChild));}}));
  attrObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-lang']});
  extraAttrs.forEach(sel=>{const el=document.querySelector(sel);if(el){['placeholder','aria-label','title'].forEach(a=>translateAttr(el,a));if(el.tagName==='SELECT')Array.from(el.options).forEach(o=>translateText(o.firstChild));}});
})();
