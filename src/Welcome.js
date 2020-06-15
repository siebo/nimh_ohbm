import React from 'react';

class Welcome extends React.Component {

  render() {
    return (
    <div>
      <h2>Identifying data sharing and data reuse in full-text NIMH-funded papers</h2>
      <h3>Travis Riddle, Francisco Pereira, &amp; Adam Thomas</h3>
      <p>Identifying and measuring data sharing and data reuse serves a number of goals that are important for scientists, funding agencies, and the public more generally. Consequently, the unmet objective of an efficient and accurate system for identification and tracking of datasets is a conspicuous shortcoming of the larger open science community.</p>

      <p>The work we describe here uses natural language processing (NLP) and machine learning to identify data sharing and reuse statements in the full-text papers available on PubMed Central. We limited the scope of our investigation to just those papers that listed funding from the NIMH per Federal Reporter. We obtained the full text of 57,771 papers published after 2008. These papers were linked to 11,987 NIMH grants awarded to a total of 7,342 primary investigators. We then split these documents into sentences and labeled a subset of sentences with two types of labels:</p>

      <ul>
        <li>A sentence is considered an instance of “data sharing” if the authors are indicating that the data that they generated for the paper are deposited and available in a public repository of some sort.</li>
        <li>A sentence is considered “data reuse” if the authors are making reference to a specific shared dataset. Here we are defining reuse as broadly as possible. We did not attempt to confirm the data was used in any analysis, but only that the reference was to a specific dataset. Typically when there's a question, we err on the side of inclusion. Brain atlases and other types of shared data products are in this category.</li>
      </ul>

      <p>Because of the expected low base rates, we used regular expression matching of known data repositories, presence of a URL, lists published by repositories of papers that are known to have used their service, and active learning to maximize the likelihood of obtaining positive training examples. In total, we labeled 1,798 sentences for instances of data sharing, of which 71 were indicated as instances of data sharing. We labeled a partially overlapping set of 1,798 sentences for instances of data reuse, of which 129 were indicated as instances of data reuse.</p>

      <p>We used standard NLP techniques to obtain input features to train an AdaBoost classifier to identify instances of data sharing and data reuse. Performance was evaluated using stratified 3-fold cross validation.</p>

      <p>Generally, precision is higher than recall. If we average across folds and label types and extrapolate this performance, we expect our labels to accurately identify an instance of data sharing or reuse 70 percent of the time. Additionally, we expect to accurately identify (recall) 59 percent of instances of data sharing or reuse.</p>

      <p>Accounting for these performance metrics, after retraining on the full labeled dataset, and extrapolating from our cross-validation performance, we expect that 4,214 (7.3&#37;) papers contain instances of data sharing and 5,167 (8.9&#37;) contain instances of data reuse, of which 1,777 and 2,179, respectively are expected to be incorrect predictions. Additionally, we are likely to miss 1,662, and 2,038 instances of data sharing and data reuse, respectively.</p>

      <p>These results indicate very low rates of data sharing and reuse. Of all 434 institutions that published at least 3 NIMH funded papers, we predicted just 18/25 have data sharing/reuse statements in more than 30&#37; of their papers (Figure 1). Similarly, of all 4,139 PI’s that published at least 3 NIMH funded papers, just 301/381 are expected to have data sharing/reuse statements in more than 30&#37; of their papers (Figure 2). Our poster will feature an error analysis and an analysis of the features of papers labeled with and without data sharing and data reuse.</p>

      <p>We anticipate that additional labeled data will help improve and stabilize performance of these methods. In the future, we also intend to explore the effectiveness of alternative approaches, including using a gold-standard list of dataset DOIs derived from Datacite.</p>
    </div>
    );
  }
}

export default Welcome;


