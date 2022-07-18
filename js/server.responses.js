

function responseWeb(typeResponse){
    switch(typeResponse){
        case 100: msgResponse="100. Continues. Everything has gone well so far."; break;
        case 101: msgResponse="101. Switching Protocol. Request header response"; break;
        case 102: msgResponse="102. Processing. Server received and is processing the request"; break;
        case 103: msgResponse="103. Early Hints. Load resources while server prepares response."; break;
        case 200: msgResponse="200. OK. Successful request."; break;
        case 201: msgResponse="201. Created Successful Request, resource created with result."; break;
        case 202: msgResponse="202. Accepted.Request received but no action taken."; break;
        case 203: msgResponse="203. Non-Authoritative Information. Returned meta information set is not exact available."; break;
        case 204: msgResponse="204. No Content. There is no content to send for this request, but the headers can be useful."; break;
        case 205: msgResponse="205. Reset Content. Reset the view of the document that sent this request."; break;
        case 206: msgResponse="206. Partial Content. Range header sent to separate download into multiple streams."; break;
        case 207: msgResponse="207. Multi-Status (WebDAV (en-US)). Various status codes may be appropriate."; break;
        case 208: msgResponse="208. Multi-Status (WebDAV (en-US)). Avoid enumerating internal members of multiple bindings to the same collection repeatedly."; break;
        case 226: msgResponse="226. IM Used (HTTP Delta encoding) Server fulfilled a GET request for the resource." ; break;
        case 300: msgResponse="300. Multiple Choice. Request has more than one possible response."; break;
        case 301: msgResponse="301. Moved Permanently. URI of required resource has changed."; break;
        case 302: msgResponse="302. Found. Required resource URI has been temporarily changed."; break;
        case 303: msgResponse="303. See Other. Fetch the resource in another URI with a GET request."; break;
        case 304: msgResponse="304. Not Modified. Answer has not been modified. Use the same cached version of the response."; break;
        case 305: msgResponse="305. Use Deprecated Proxy. Previous version of the HTTP.Search specification defined."; break;
        case 306: msgResponse="306. Unused Deprecated."; break;
        case 307: msgResponse="307. Temporary Redirect. Fetch the requested resource in another URI with the same method used."; break;
        case 308: msgResponse="308. Permanent Redirect. Resource is permanently located in another URI."; break;
        case 400: msgResponse="400. Bad Request. Request not accepted, conflict or inconsistency in the data."; break;
        case 401: msgResponse="401. Unauthorized. Invalid information."; break;
        case 402: msgResponse="402. Payment Required. Payment Required."; break;
        case 403: msgResponse="403. Forbidden. Access denied to resource."; break;
        case 404: msgResponse="404. Not Found. Resource does not exist."; break;
        case 405: msgResponse="405. Method Not Allowed. http method not allowed"; break;
        case 406: msgResponse="406. Not Acceptable. Incompatible service request"; break;
        case 407: msgResponse="407. Proxy Authentication Required. Authentication must be done through a proxy."; break;
        case 408: msgResponse="408. Request Timeout. Idle or unused connection."; break;
        case 409: msgResponse="409. Conflict Current state conflicting with request"; break;
        case 410: msgResponse="410. Gone. Requested resource not available"; break;
        case 411: msgResponse="411. Length Required. Content-Length header required"; break;
        case 412: msgResponse="412. Precondition Failed. Condition does not match current state"; break;
        case 413: msgResponse="413. Payload Too Large. Request exceeds threshold"; break;
        case 414: msgResponse="414. URI Too Long. Requested URI is longer than the server accepts"; break;
        case 415: msgResponse="415. Unsupported MediaType. Request format not supported"; break;
        case 416: msgResponse="416. Requested Range Not Satisfiable. Invalid byte range"; break;
        case 417: msgResponse="417. Expectation Failed. Expect header field cannot be satisfied"; break;
        case 418: msgResponse="418. I'm a teapot. The server refuses the attempt to brew coffee in a teapot."; break;
        case 421: msgResponse="421. Misdirected Request. The request was directed to a server unable to produce the response."; break;
        case 422: msgResponse="422. Unprocessable Entity. Semantically incorrect request"; break;
        case 423: msgResponse="423. Blocked. Resource being accessed is blocked."; break;
        case 424: msgResponse="424. Failed Dependency. Previous request failed."; break;
        case 425: msgResponse="425. Too Early. Server will not process request that can be redone."; break;
        case 426: msgResponse="426. Upgrade Required. Server refuses to execute the request using the current protocol with the same protocol.";break;
        case 428: msgResponse="428. Precondition Required. Origin server requires the response to be conditional."; break;
        case 429: msgResponse="429. Too Many Requests. Time limited application"; break;
        case 431: msgResponse="431. Request Header Fields Too Large. Server will process the request because the header fields are too big."; break;
        case 451: msgResponse="451. Unavailable For Legal Reasons. Requested an illegal resource."; break;
        case 500: msgResponse="500. Internal Server Error. Error processing request."; break;
        case 501: msgResponse="501. Bad Gateway. Requested feature not implemented."; break;
        case 503: msgResponse="503. Service Unavailable. Service temporarily unavailable."; break;
        case 504: msgResponse="504. Gateway Timeout. Server received no response."; break;
        case 505: msgResponse="505. HTTP Version Not Supported. Server is acting as a gateway and doesn't get a response in time."; break;
        case 506: msgResponse="506. Variant Also Negotiates. The HTTP version used in the request is not supported by the server."; break;
        case 507: msgResponse="507. Insufficient Storage. Storage quota reached."; break;
        case 508: msgResponse="508. Loop Detected. The server detected an infinite loop while processing the request."; break;
        case 509: msgResponse="509. Bandwidth Limit Exceeded."; break;
        case 510: msgResponse="510. Not Extended. Requirement of extensions after the request to the server."; break;
        case 511: msgResponse="511. Network Authentication Required. Authentication is required to gain access to the network."; break;
        
        //warning message that session will expire
        case 999: msgResponse="Your session will expire in 5 minutes due to inactivity."; break;
        
        default: msgResponse="!Unknown Error."; 
    }
    
    let responseWeb = msgResponse;
    
}


