# Tuan Tran's song recommendation API Documentation


## Endpoint 1 - Put a song request in the data file
**Request Format:** /recommend

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Send a song recommendation to data file.


**Example Request:** /recommend

**Example Response:**
```json
]
  {
    "title": "Play Date",
    "artist": "Melanie Martinez",
    "url": "https://www.youtube.com/watch?v=Nxs_mpWt2BA"
  },
  {
  "title": "The Scotts",
  "artist": "THE SCOTTS, Travis Scott, Kid Cudi",
  "url": "https://www.youtube.com/watch?v=sw4r0k8WWqU"
  }
]
```

**Error Handling:**
- Possible 400 (invalid request) errors in text:
  - If the request is missing title, artist or url, an error is return: `Missing required param`.

## Get the data all song recommended.
**Request Format:** /song/:type

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Return a set of recommended songs with artist and URL to song. Clinet can specify which format type is returned. /json for a JSON object return or /text for plain text.

**Example Request:** /song/json
**Example Response:**
```json
]
  {
    "title": "Play Date",
    "artist": "Melanie Martinez",
    "url": "https://www.youtube.com/watch?v=Nxs_mpWt2BA"
  },
  {
  "title": "The Scotts",
  "artist": "THE SCOTTS, Travis Scott, Kid Cudi",
  "url": "https://www.youtube.com/watch?v=sw4r0k8WWqU"
  }
]
```

```text
Melanie Martinez - Play Date URL: https://www.youtube.com/watch?v=Nxs_mpWt2BA
THE SCOTTS, Travis Scott, Kid Cudi - The Scotts URL: https://www.youtube.com/watch?v=sw4r0k8WWqU
Daniel Caesar - Frontal Lobe Musik URL: https://www.youtube.com/watch?v=g2Esp1dtD3E
```

**Error Handling:**
- Possible 400 (invalid request) errors in text:
  - If the request is missing type parameter: `Invalid file return type, use text or json`.
