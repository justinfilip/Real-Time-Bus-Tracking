# Real Time Bus Tracking

### Real-time locations of buses en route between MIT and Harvard using the Google Maps Javascript API and data from mbta.com. Buses are represented as the MBTA logo and the location of the buses is updated every 15 seconds.

https://www.youtube.com/watch?v=16GIgTOt1n8

## How to Run
- Enable the Maps Javascript API in a new Google Cloud project
- Add billing information and attach a billing account to your project (won't cost anything to run this)
- Create an API key
- Replace YOUR_API_KEY with your API key in index.html
- Load index.html in a browser

## Improvements made so far

- Added a base64 encoded version of the MBTA logo as the marker icons
- Added a global variable for indicating that updated data is available. I use this variable in my marker update function to determine wether to update the markers or set a timeout to check again in one second
- Changed it to update the position of existing markers instead of deleting all markers and setting new ones by saving each new marker in a list of two objects [busID, marker] and using that list to determine wether a marker already exists for a datapoint
- Added comments describing functionality and high level steps

## Roadmap of future improvements
- Show bus # on hover over bus transit icon
- Show occupancy status on hover over bus transit icon

## License
MIT License

Copyright (c) 2024 Justin Filip

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
