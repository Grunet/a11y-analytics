import { getCommonHeadChildren } from "../../common/head.ts";
import { getSharedStyleTag } from "../../common/styles.ts";

const bodyContents =
  `<h1 id="from-analytics-for-accessibility-to-money-for-disabled-people">From Analytics for Accessibility To Money for Disabled People</h1>
<p>Analytics for Accessibility today is limited in what it can capture.</p>
<p>However, this isn’t a hard limit. In fact, it should be possible to extend Analytics for Accessibility and make money for disabled people at the same time.</p>
<p>This article goes over the ideas behind that possibility.</p>
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
<li><a href="#analytics-for-accessibility-today">Analytics for Accessibility: Today</a><ul>
<li><a href="#a-starting-point-made-from-web-apis">A Starting Point Made From Web APIs</a></li>
<li><a href="#the-good-limitations-of-web-apis">The (Good) Limitations of Web APIs</a></li>
</ul>
</li>
<li><a href="#analytics-for-accessibility-a-potential-future">Analytics for Accessibility: a Potential Future</a><ul>
<li><a href="#the-high-level-idea">The High-Level Idea</a><ul>
<li><a href="#a-dedicated-analytics-solution-for-disabled-people">A Dedicated Analytics Solution for Disabled People</a></li>
<li><a href="#optimized-research-participant-finding">Optimized Research Participant Finding</a></li>
</ul>
</li>
<li><a href="#payments-to-disabled-people">Payments to Disabled People</a><ul>
<li><a href="#lotteries-driven-by-the-companies-paying-for-access-to-analytics-data">Lotteries driven by the Companies’ Paying for Access to Analytics Data</a></li>
<li><a href="#premium-research-participation-rates-charged-to-the-companies">Premium Research Participation Rates Charged to the Companies</a></li>
</ul>
</li>
<li><a href="#why-this-could-work">Why This Could Work</a><ul>
<li><a href="#disabled-peoples-experiences-are-undervalued">Disabled Peoples’ Experiences are Undervalued</a></li>
<li><a href="#companies-are-required-in-some-capacity-to-care-about-disabled-peoples-experiences">Companies are Required in Some Capacity to Care About Disabled Peoples’ Experiences</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#summary">Summary</a></li>
</ul>
<h2 id="analytics-for-accessibility-today">Analytics for Accessibility: Today</h2>
<p>To understand what Analytics for Accessibility could become in the future, we need to understand where it sits today.</p>
<h3 id="a-starting-point-made-from-web-apis">A Starting Point Made From Web APIs</h3>
<p>The way Analytics for Accessibility works today is by querying web APIs via Javascript and then reporting the results to an analytics provider.</p>
<p>For example, it uses the focus-visible pseudo-class to determine if the user is using the keyboard, and then it sends that information to Google Analytics (or another provider) for further analysis.</p>
<p>However, there are many aspects of disabled user experience this approach cannot capture.</p>
<h3 id="the-good-limitations-of-web-apis">The (Good) Limitations of Web APIs</h3>
<p>By design, the web does not allow for Javascript to directly know about a user’s disabilities. This is key to preserving user privacy in the face of potentially malicious websites.</p>
<p>For example, this means Javascript cannot directly detect if someone is using a screen reader or a voice control tool, or if the user is colorblind.</p>
<p>This in turn means that Analytics for Accessibility is limited to detecting a few coarse groupings of users (exposed by Javascript) that happen to contain disabled people. It cannot go further beyond that.</p>
<h2 id="analytics-for-accessibility-a-potential-future">Analytics for Accessibility: a Potential Future</h2>
<p>However, if we look beyond what Javascript is capable of, I believe there is a way to gain information on the experience of any disabled user. And most importantly, while continuing to preserve privacy and expose zero information about their disability to any arbitrary website.</p>
<h3 id="the-high-level-idea">The High-Level Idea</h3>
<h4 id="a-dedicated-analytics-solution-for-disabled-people">A Dedicated Analytics Solution for Disabled People</h4>
<p>The key ingredients are as follows</p>
<ul>
<li>A trusted website all disabled users feel comfortable sharing their high-level disability information (e.g. having a motor disability) and high-level browsing history (i.e. domains) with</li>
<li>A way for disabled users to log in to that website, share their info, and set a cookie in their browser</li>
<li>An analytics script that can be added to any website and that sends the cookie alongside analytics event data</li>
</ul>
<p>From the point of view of a website using the analytics script, the cookie is 3rd party and cannot be accessed by the website. This preserves the existence of and information of the disabled user.</p>
<p>It’s only when the cookie reaches the trusted website’s backend that it can be parsed and the analytics event data it was sent with can be enriched with the disability information of the user. </p>
<p>The analytics backend also needs to only let website owners view analytics data in the aggregate, to avoid them identifying individual users by correlating with other information sources. This protects the privacy of individual disabled users.</p>
<p>With that, website owners should now be able to get estimates to questions like “What fraction of my colorblind users are converting in my critical flow?”, previously impossible to answer with a Javascript-only approach.</p>
<h4 id="optimized-research-participant-finding">Optimized Research Participant Finding</h4>
<p>The trusted backend is aware of which domains disabled users are visiting, and so can act as a privacy-preserving proxy for companies looking to find disabled user research participants.</p>
<p>The key advantage is that some of these participants have already tried to use the companies products, and may have more specific insights to share from their experiences.</p>
<p>Contrast this with user research platforms that can only recruit disabled people in general, not necessarily ones with experience in a certain product.</p>
<h3 id="payments-to-disabled-people">Payments to Disabled People</h3>
<p>Disabled people should be compensated monetarily for all their time and energy indirectly given to these companies.</p>
<p>There are 2 ways I think the compensation could work.</p>
<h4 id="lotteries-driven-by-the-companies-paying-for-access-to-analytics-data">Lotteries driven by the Companies’ Paying for Access to Analytics Data</h4>
<p>Companies would pay for access to their analytics data, proportional to its throughput.</p>
<p>One option would be to distribute this money to all disabled users, giving a small amount to each disabled user. While fair, the amount of money will not be significant enough to make a difference in anyone’s life, and it will be troublesome to distribute the money.</p>
<p>A better option would be to distribute the money via multiple lotteries (e.g. grouped by facets such as disability) where every individual has a chance to win a large sum of a potentially life-changing amount of money. Distribution is easier as well with only a few winners needing to be sent winnings periodically.</p>
<h4 id="premium-research-participation-rates-charged-to-the-companies">Premium Research Participation Rates Charged to the Companies</h4>
<p>Companies would compensate any users they recruit for research normally from the platform.</p>
<p>However, since users with experience using their websites are a smaller, scarcer subset of all users, those users will be paid at a premium if recruited.</p>
<h3 id="why-this-could-work">Why This Could Work</h3>
<p>Why would disabled users join a platform like this? And why would companies sign up to pay for it?</p>
<h4 id="disabled-peoples-experiences-are-undervalued">Disabled Peoples’ Experiences are Undervalued</h4>
<p>Supply and demand dictates that something that is scarce in supply should have a higher price.</p>
<p>By this logic, we should be putting a high price on disabled peoples’ experiences and paying them accordingly, as disabled people comprise groups of small minorities.</p>
<p>I believe that people will join a platform that values them highly like they should be.</p>
<p>The only explanation for why this isn’t observed to be the case today is that demand from companies is low.</p>
<h4 id="companies-are-required-in-some-capacity-to-care-about-disabled-peoples-experiences">Companies are Required in Some Capacity to Care About Disabled Peoples’ Experiences</h4>
<p>I believe that the demand for disabled peoples’ experiences from companies is there, it’s just currently redirected into audits that instead proxy disabled users’ experiences through the lens of auditors.</p>
<p>Given that companies are required to care about disabled peoples’ experiences in some form (e.g. due to litigation risk) my hypothesis is that getting the raw, unfiltered view of their experiences will be heavily preferred to performing periodic audits.</p>
<h2 id="summary">Summary</h2>
<p>Disabled peoples’ experiences are undervalued. </p>
<p>An analytics platform can serve as the vector for delivering information about those experiences to the companies that create the products defining them.</p>
<p>Companies will pay for that information, which will then be passed on to disabled participants of the platform.</p>`;

function render() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${
    getCommonHeadChildren({
      title: "A Potential Future for Analytics for Accessibility",
      description:
        "An outline of how analytics for accessibility could expand in measuring disabled peoples' experiences",
    })
  }
        ${getSharedStyleTag()}
      <body>
        <main>
            ${bodyContents}
        </main>
      </body>
    </html>
  `;

  return {
    html,
  };
}

export { render };
