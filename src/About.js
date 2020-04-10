import React from 'react';
import Card from 'react-bootstrap/Card';

export const About = () => (
     <div>
         <h2> About Page </h2>
         <div class="card" style={{height: "20rem"}}>
            <div class="card-body">
                <h5 class="card-title">CSGO.GG</h5>
                <h6 class="card-subtitle mb-2 text-muted"> React | Flask | Python | Pandas | Numpy | HTML5 | CSS3 </h6>
                <p class="card-text"> CSGO.GG offers a quick lookup of the past performance of CSGO Esports teams in their respective regions. It also uses an AI to quickly predict the most likely outcome of a match between two teams and displays data on their past performance. Application built using Redux, Flask, Pandas, and Numpy.</p>
            </div>
        </div>
        <br></br>
        <br></br>
    </div>
)
