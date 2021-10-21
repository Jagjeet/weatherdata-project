# Weather Data- Project III

<div style="text-align:center"> <img src="" alt="NOAA Logo" width="200"/></div>

<br></br>
<div style="text-align:center"> <span style="font-family:calibri; font-size:2em; color:lightblue;">Goal:</span></div>
The goal of this project was to extract, transform, and load weather data into a Mongo database; then, taking that data and creating at least three different dashboard tools to display weather data in different visualization styles (i.e. charts and maps). We then wanted to add interactivity with our pages to allow the visualizations to change based on the user’s selections on the page.
<br></br>
In the below README we have provided additional information about our:

1. Data used
2. ETL (Extract, Transform, Load) process
3. Visualizations & Interactions available to a user


<br></br>
<div style="text-align:center"> <span style="font-family:calibri; font-size:2em; color:lightblue;" >Data Used:</span></div>
<br></br>
<div style="text-align:center"> <img src="https://storage.googleapis.com/kaggle-competitions/kaggle/3136/media/kaggle-transparent.svg" alt="NOAA Logo" width="200"/></div>
<div style="text-align:center"> <img src="https://www.omao.noaa.gov/sites/default/files/media/NOAA-Logo_large_no%20back.png" alt="NOAA Logo" width="200"/></div>
Our data came from a NOAA GSOD dataset that was pulled and put into Kaggle, which can be found here: <a href="https://www.kaggle.com/noaa/noaa-global-surface-summary-of-the-day" target="_top">Kaggle Data</a>. Per the link:
"This dataset is identical to Kaggle's NOAA GSOD dataset using BigQuery. The data for both datasets updates on the same basis (daily) but may not be updated on the same time. Data from this dataset can be downloaded/accessed through this dataset page and Kaggle's API...

<div style="text-align:center"> <span style="font-family:calibri; font-size:1.4em; color:lightblue;" >Content</span></div>
The online data files begin with 1929 and are at the time of this writing at the Version 8 software level. Over 9000 stations' data are typically available. The daily elements included in the dataset (as available from each station) are: Mean temperature (.1 Fahrenheit) Mean dew point (.1 Fahrenheit) Mean sea level pressure (.1 mb) Mean station pressure (.1 mb) Mean visibility (.1 miles) Mean wind speed (.1 knots) Maximum sustained wind speed (.1 knots) Maximum wind gust (.1 knots) Maximum temperature (.1 Fahrenheit) Minimum temperature (.1 Fahrenheit) Precipitation amount (.01 inches) Snow depth (.1 inches) Indicator for occurrence of: Fog, Rain or Drizzle, Snow or Ice Pellets, Hail, Thunder, Tornado/Funnel Cloud.
<br></br>
<div style="text-align:center"> <span style="font-family:calibri; font-size:1.4em; color:lightblue;" >Acknowledgements</span></div>
Dataset Source: NOAA. This dataset is publicly available for anyone to use under the following terms provided by the Dataset Source — http://www.data.gov/privacy-policy#data_policy — and is provided "AS IS" without any warranty, express or implied, from Google. Google disclaims all liability for any damages, direct or indirect, resulting from the use of the dataset."


<br></br>
<div style="text-align:center"> <span style="font-family:calibri; font-size:2em; color:lightblue;">ETL (Extract, Transform, Load) process:</span></div>
<br></br>

1. We downloaded the tar and csv files from Kaggle
![Kaggle Download Screenshot](Screenshots\Kaggle_screenshot_dl.PNG)
![FilesOnOurComputer](Screenshots\FilesScreenshots.PNG)
<br></br>

2. We used Python and Pandas to <b>E</b>xtract the data from both file types 

<br></br>
Extracting from csv into a Pandas DataFrame with date time cleaning:
![Code to Extract Location CSV data](Screenshots\Station_location_code.PNG)
<br></br>
Extracting from TAR files into a Pandas DataFrame with date time cleaning:

![Code to Extract TAR file data](Screenshots\Tar_file_extract_code.PNG)
<br></br>

3. <b>T</b>ransformed it into a clean DataFrame

<br></br>
We did a lot of the cleaning while extracting (see screenshots above); however, after merging the two DataFrames more cleaning needed to be done:

![Merging DFs](Screenshots\mergingDFs.PNG)

![Cleaning Merge](Screenshots\cleaningmerge.PNG)
<br></br>
4. <b>L</b>oaded into our Mongo Database

<br></br>
<div style="text-align:center"> <span style="font-family:calibri; font-size:2em; color:lightblue;">Visualizations & Interactions available to a user:</span></div>
<br></br>

