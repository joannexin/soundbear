import { getSearchItem, relatedTree } from './../modules/ajax';

module.exports = { 

    tree: function() {

        var i = 0;
        var duration = 750;
        var root;

        var existingArtists = [];
        var lastSelected;

        // Assign each image its own clippath
        var clipPathId = 0;

        // Define size of the display window
        var viewerWidth = 1000;
        var viewerHeight = 1000;

        var tree = d3.layout.tree()
            .size([viewerHeight, viewerWidth]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.x, d.y];
            });

        // Make the tree zoomable
        function zoom() {
            svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        };
      
        // Call zoom function on zoom event 
          // Set lower and upper bound on scale sensitivity
        var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

        var baseSvg = d3.select("#tree-container").append("svg")
            .attr("width", viewerWidth)
            .attr("height", viewerHeight)
            .attr("class", "overlay")
            // Attach zoom listener
            .call(zoomListener);
    
        function updateWindow() {
            viewerWidth = 1000;
            viewerHeight = 1000;
            baseSvg.attr("width", viewerWidth).attr("height", viewerHeight);
            if (lastSelected) {
                centerNode(lastSelected);
            }
        };

        // Center node when clicked so that it will not get lost
        var firstcall = 1;
        function centerNode(source) {

            lastSelected = source;
            var scale = zoomListener.scale();

            var y = -source.y0;
            var x = -source.x0;
            x = x * scale + viewerWidth / 2;
            y = y * scale + viewerHeight / 2;

            // Center the root on the top of the window
            if (firstcall < 4) {
              x = 0;
              y = 100;
              firstcall+=1;
            }

            d3.select('#tree-container g').transition()
                .duration(duration)
                .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
            zoomListener.scale(scale);
            zoomListener.translate([x, y]);
        };

        function updateInfo(node) {
            var artists;
            relatedTree(node.artist.id, existingArtists)
            .then(function(artists) {
                if (!node.children) {
                    node.children = []
                }

                artists.forEach(function(artist) {
                    node.children.push(
                        {
                            'artist': artist,
                            'children': null
                        }
                    )
                    existingArtists.push(artist.id);

                });
                updateLevels(node);
                centerNode(node);
            });
        };

        function initializeArtists(artist) {
            existingArtists.push(artist.id);
            return {
                'artist' : artist,
                'children': null,
            }
        };

        function isArtist(d) {
            return 'artist' in d;
        };

        function removeExpandedId(d) {
            if (d.children) {
                d.children.forEach(function(node) {
                    removeExpandedId(node);
                });
            }
            var indexToRem = existingArtists.indexOf(d.artist.id);
            existingArtists.splice(indexToRem, 1);
        };

        // Toggle children function
        function toggleData(d) {
            if (d.children) {
                d.children.forEach(function(node) {
                  removeExpandedId(node);
                });
                d.children = null;
                updateLevels(d);
                centerNode(d);
            } else {
                if (isArtist(d)) {
                    updateInfo(d);
                } 
            }
            return d;
        };



        function click(d) {
            d = toggleData(d);
        };


        function chooseImage (images) {
            var fixedSize = 64;
            images.forEach(function (image) {
                if (image && image.width > fixedSize && image.width > 64) {
                    return image.url;
                }
            });
            return images[images.length - 1].url;
        };

        function updateLevels (source) {
           
            var levelWidth = [1];
            var childCount = function(level, n) {
                if (n.children && n.children.length > 0) {
                    if (levelWidth.length <= level + 1) { 
                      levelWidth.push(0);
                    }
                    levelWidth[level + 1] += n.children.length;
                    n.children.forEach(function(d) {
                        childCount(level + 1, d);
                    });
                }
            };

            childCount(0, root);
            var newHeight = d3.max(levelWidth) * 100;
            tree = tree.size([newHeight, viewerWidth]);

            // Compute new tree layout
            var nodes = tree.nodes(root).reverse();
            var links = tree.links(nodes);

            // Set widths between levels
            nodes.forEach(function(d) {
                 d.y = (d.depth * 200);

            });

            // Update nodes
            var node = svgGroup.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });

            // Enter new nodes at the parent's previous position
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + source.x0 + "," + source.y0 + ")";
                })
                .on('click', click);



            nodeEnter.append("circle")
                .attr("r", 32)
                .style("fill", function(d) {

                    return d._children ? "black" : "#fff";
                });

            clipPathId++;

            nodeEnter.append("clipPath")
                .attr("id", "clipCircle" + clipPathId)
                    .append("circle")
                    .attr("r", 32);

            nodeEnter.append("image")
                .attr("xlink:href", function(d) {
                    if (isArtist(d)) {
                      return chooseImage(d.artist.images);;
                    } 
                })
                .attr("x", "-32px")
                .attr("y", "-32px")
                .attr("clip-path", "url(#clipCircle" + clipPathId + ")")
                .attr("width",
                  function(d) {
                      if (isArtist(d)) {
                          var image = d.artist.images[1];
                          if (!image) {
                            return 64;
                          }
                          if (image.width > image.height) {
                              return 64 * (image.width / image.height)
                          } else {
                              return 64;
                          }
                      } else {
                        return 64;
                      }
                  })
                .attr("height",
                  function(d) {
                      if (isArtist(d)) {

                          var image = d.artist.images[1];
                          if (!image) {
                            return 64;
                          }
                          if (image.height > image.width) {
                              return 64 * (image.height/image.width)
                          } else {
                              return 64;
                          }
                      } else {
                        return 64;
                      }
                  })

            nodeEnter.append("text")
                .attr("y", function(d) {
                    return 45;
                })
                .attr("dx", ".35em")
                .attr('class', 'nodeText')
                .attr("text-anchor", function(d) {
                    return "middle";
                })
                .text(function(d) {
                    if (isArtist(d)) {
                        // For long names
                        if (d.artist.name.length > 6 && d.artist.name.indexOf(' ') === -1) {
                          return d.artist.name.slice(0,7) + '...';

                        // For long first and last names
                        } else if (d.artist.name.length > 6 && d.artist.name.indexOf(' ') !== -1 && d.artist.name.split(' ')[0] !== 'The'){
                          var splitted = d.artist.name.split(' ');
                          return splitted[0] + ' ' + splitted[1].slice(0, 1) + '.';

                        // For band names that start with The
                        } else if (d.artist.name.length > 6 && d.artist.name.indexOf(' ') !== -1 && d.artist.name.split(' ')[0] === 'The') {
                            return d.artist.name.slice(0,7) + '...';
                  
                        } else {
                          return d.artist.name;
                        }
                    } 
                })
                .style("fill-opacity", 0);

            // Transition nodes to new position
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            // Fade the text 
            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.x + "," + source.y + ")";
                })
                .remove();

            nodeExit.select("circle")
                .attr("r", 0);

            nodeExit.select("text")
                .style("fill-opacity", 0);

            // Update links
            var link = svgGroup.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

            // Enter new links at the parent's previous position
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });

            // Transition links to their new position
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

            // Stash old positions for transition
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        };

        // Append a group which holds all nodes
        var svgGroup = baseSvg.append("g");

        return {
            setRoot: function(artist) {
              existingArtists = []
              root = initializeArtists(artist);
              root.x0 = viewerHeight / 2;
              root.y0 = 0;
              updateLevels(root);
              centerNode(root);
              click(root);
              firstcall = 2;
            },

            resizeOverlay: function() {
              updateWindow();
            }
        };
    }
};