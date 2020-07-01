# Data Sharing in NIMH papers

## What is this?
This is a repository for the [ShareStats application](http://nih-fmrif.github.io/sharestats). ShareStats is an effort from the [NIMH IRP's Data Science and Sharing Team](http://cmn.nimh.nih.gov/dsst) to build a database of NIMH-funded papers with data statements.

## How did you assign these labels?
The labels are the result of a natural language processing and classification system. We have a [OHBM 2020](https://www.humanbrainmapping.org/i4a/pages/index.cfm?pageID=3958&activateFull=true) poster with some details on our method available [here](https://zenodo.org/record/3894807).

## What is a data statement?
A data statement is a reference to a specific instance of data sharing or data reuse. It needs to be specific, with some minimal information about where the data set is posted or downloaded from.

## What about atlases, interactive data applications, and other data products?
There are a surprising number of edge cases when considering whether something is a data statement. For the moment, we have been erring on the side of inclusivity. Atlases, data applications, and other data products should be counted as data statements, as long as they meet the criteria that the reference is specific and there is a minimal indication of where the data could be found.

## Why can't I find my name/institution?
Our data is sourced from NIH's [Pubmed Central](https://www.ncbi.nlm.nih.gov/pmc/), and [Federal Reporter](https://federalreporter.nih.gov/FileDownload), covering the federal reporting years from 2004 to 2018. Because of the way this data is archived, it is difficult to disambiguate individual authors and institutions unless that author is listed as a Primary Investigator on an NIMH funded grant. If your institution is not listed as the organization for an NIMH funded grant during these years, it will not be present in our data. Similarly, if an individual is not listed as the PI for an NIMH funded grant during these years, it will not be present in our data.

## Why can't I find my paper?
The most likely reason is that the paper is not listed as the product of an NIMH funded grant. In future releases we will try to incorporate more data sources. 

## Why are you only including NIMH funded investigators and the papers they cite in their grants? Why not expand to all of neuroimaging/neuroscience/science?
Partly becuase NIMH is our employer. And partly becuase it puts some managable boundaries on the problem. The link between publications and grants (provided by NIH Reporter) also means that we don't have to deal with the difficult problem of author resolution. 

## Can I help/contribute?
Absolutely! We would love to see this grow into a community effort. All of our data and code is publically available.

## I have another question that's not addressed here.
We're looking for any and all feedback so please don't hesitate to open an [issue](https://github.com/nih-fmrif/sharestats/issues) on this repo or send a direct message on twitter to [Adam Thomas](https://twitter.com/damadam) and/or [Travis Riddle](https://twitter.com/triddle42)
