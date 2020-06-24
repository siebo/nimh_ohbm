import React from 'react';

class Welcome extends React.Component {

  render() {
    return (
    <div className="mainContent">
      <h2>Identifying data sharing and data reuse in full-text NIMH-funded papers</h2>
      <h3>Travis Riddle, Francisco Pereira, &amp; Adam Thomas</h3>
      <p>Our <a href="https://cmn.nimh.nih.gov/dsst">team</a> is developing a system to automatically classify data sharing and data reuse statements in NIMH-funded research texts. We have presented some of this work as a poster at <a href="https://zenodo.org/record/3894806">OHBM</a>. Our current classification system does a serviceable job, but is not ready for 'prime time'. We need more labeled data.</p>

      <p><b>What we want from you:</b></p>
      <p>Have a look around! Know of some papers (funded by NIMH) that share or reuse data? Make sure they're labeled correctly. Do you see some papers that are mislabeled? Fix them! If you find a false negative, it would be especially helpful if you would paste the sentence from the paper that indicates data sharing/reuse into the text box.</p>

      <p>Look for papers by institution, or by investigators using the menu tray at the top left. Note that investigators and institutions are determined by the grant associated with a paper, so there will almost certainly be many other authors and institutions on a paper who are not represented in these data.</p>

      <p><a href="https://github.com/nih-fmrif/sharestats/blob/master/README.md">Feedback and Frequently Asked Questions</a></p>
    </div>
    );
  }
}

export default Welcome;


