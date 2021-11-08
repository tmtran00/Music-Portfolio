# music-portfolio
Here is my project practicing fullstack web development using HTML, CSS, JavaScript, NodeJS and SQLite in order display music that I have recently enjoyed. 


# Functionality
On this website, I displayed various songs that I enjoyed listening to. Users can click on each songs which will drop down a YouTube video for the song.


<img src="/pic/front page.PNG" width= 1000px, height = auto>

<img src="/pic/Slide.PNG" width= 400px, height = auto>


At the bottom, I placed an API call onto last.fm radio station, I then received the top 5 most popular songs from a certain artist and and create a list to display them.
Each item on the list is a link to a search query on YouTube so that users can continue exploring.

<img src="/pic/Recommend.PNG" width= 400px, height = auto>

Users can also send me recommendations through the Suggestions page. The suggestions then gets added onto a SQL database which then get processed and displayed back onto the webpage using JavaScipt.

# Future Improvements
On page creation, it takes a long time for webpage to load all the videos linked on the buttons. One way I can fix this is by having these video links as a list in JavaScript and then assigning it after the page finished loading. This will ensure faster load time.

At first glance, some buttons are not obvious buttons which may confuse users as to whether or not they have any functionality. I can change the look of each button to be more animated, maybe three dimensional, so it looks more interactive.
