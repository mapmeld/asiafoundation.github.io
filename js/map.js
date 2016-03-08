var width = 1000, height = 600;

var projection = d3.geo.mercator()
  .scale(400)
  .translate([-200, 450])
  .precision(0.0001);

var path = d3.geo.path()
  .projection(projection);

var tooltip = d3.select('#mapper').append('div')
  .attr('class', 'hidden tooltip');

var svg = d3.select("#mapper").append("svg")
  .attr("width", width)
  .attr("height", height);

var gjsrc = "/js/countries.geo.json";

var textFor = {
  'Afghanistan': [{
    title: 'Visualizing Afghanistan',
    summary: 'Responsive web site and data visualization of eight years of Afghan public perception survey data.'
  }],
  'Bangladesh': [{
    title: 'Mobile Banking & Women',
    summary: 'Supporting women entrepreneurs’ access to mobile banking and e-commerce services.'
  }],
  'Cambodia': [{
    title: 'VAW and Mobile',
    summary: 'Developing mobile apps to improve women’s safety through human-centered design.'
  }],
  'China': [{
    title: 'Open Data and Environmental Policy',
    summary: 'Promoting open data and improved environmental policy making through local partnerships.'
  }],
  'India': [{
    title: 'Crowdsourcing Women’s Safety',
    summary: 'Support for the mobile application, Safetipin, to improve mapping of unsafe urban areas.'
  },{
    title: 'Anti-Corruption Reporting',
    summary: 'Design and development of mobile apps to expand the user base of IPaidABribe.com'
  }, {
    title: 'Mapping Government Services',
    summary: 'Mapping local infrastructure in the wards of Chennai to help improve public services.'
  }],
  'Indonesia': [{
    title: 'Interactive Candidate Map',
    summary: 'Creating Indonesia’s first web and mobile interactive candidate map for the 2014 Indonesian elections.'
  },{
    title: 'Civic Hackathons',
    summary: 'Hosting civic hackathons in Jakarta and Bandung to build election and voter information mobile apps.'
  },{
    title: 'Open Candidate and Election Data',
    summary: 'Developing and structuring Indonesia’s Open Election and Candidate Database and Public API.'
  },{
    title: 'Public Candidate and Election API',
    summary: 'Design, implementation, and training support for a public election data application programming interface.'
  }],
  'Mongolia': [{
    title: 'Remote Sensing and Urban Planning',
    summary: 'Using remote sensing tools to support evidence-based policy making to improve Ger District public services.'
  },{
    title: 'Ulaanbaatar and OpenStreetMap',
    summary: 'Promoting community mapping and citizen engagement via OpenStreetMap'
  }],
  'Myanmar': [{
    title: 'Open Election Data and Mobile App',
    summary: 'Supporting an election data hackathon, candidate database, and the creation of voter information mobile apps'
  },{
    title: 'Promoting Local Content and Access',
    summary: 'Support for localization of Google’s top-level domain in Myanmar google.com.mm'
  },{
    title: 'Revising the Electronic Transactions Law',
    summary: 'Expert legal advice and guidance on ETLs provided to Ministry of Communication and Information Technology'
  }],
  'Philippines': [{
    title: 'Human Rights and Digital Activism',
    summary: 'Technical assistance and training on human rights through digital activism'
  }],
  'Sri Lanka': [{
    title: 'Mobile Citizen Report Cards',
    summary: 'Employing tablet-based report cards to collect, analyze, and act on citizen feedback.'
  }],
  'Vietnam': [{
    title: 'Empowering Citizens',
    summary: 'Supporting online citizen input to promote public engagement on national policies.'
  }]
}

if ($(window).width() > 700) {
  d3.json(gjsrc, function(error, countries) {
    if (error) {
      throw error;
    }

    svg.selectAll("svg")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", function(d) {
        return "country";
      })
      .attr("d", path)
      .on('mousemove', function(d) {
        if (!textFor[d.properties.name]) {
          return;
        }
        var mouse = d3.mouse(svg.node()).map(function(d) {
          return parseInt(d);
        });
        var proj = textFor[d.properties.name] || [];
        var projtxt = '';
        for (var p = 0; p < proj.length; p++) {
          projtxt += '<p><strong>' + proj[p].title + '</strong><br/>' + proj[p].summary + '</p>';
        }

        tooltip.classed('hidden', false)
          .attr('style', 'left:' + (mouse[0] + 15) +
                'px; top:' + (mouse[1] - 35) + 'px')
          .html(d.properties.name + projtxt);
      })
      .on('mouseout', function() {
        tooltip.classed('hidden', true);
      });
  });
} else {
  $("#map").remove();
}
