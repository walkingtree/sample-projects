import { Component } from '@angular/core';
// import { d3selectAll } from 'd3-selection';
import * as d3 from "d3";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    ngAfterViewInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        // d3.selectAll("p").style("color", function () {
        //     return "hsl(" + Math.random() * 360 + ",100%,50%)";
        // });
        function padExtent(e: Array<number>, p: any) {
            if (p === undefined) p = 1;
            return ([e[0] - p, e[1] + p]);
        }
        var svg = d3.select("#scatter"),
            margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            domainwidth = width - margin.left - margin.right,
            domainheight = height - margin.top - margin.bottom;
        

        var x = d3.scaleLinear()
            .domain(padExtent([1, 5], undefined))
            .range(padExtent([0, domainwidth], undefined));
        var y = d3.scaleLinear()
            .domain(padExtent([1, 5], undefined))
            .range(padExtent([domainheight, 0], undefined));
        var label_array = [], anchor_array = [];
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.top + "," + margin.top + ")");

        g.append("rect")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .attr("fill", "#F6F6F6");

        let data = [
            {
                "question": "Activity zero point 2",
                "answer": "Some answer",
                "value": 5,
                "consequence": 0.2
            }, {
                "question": "Activity zero",
                "answer": "Some answer",
                "value": 5,
                "consequence": 0.5
            }, {
                "question": "Activity One",
                "answer": "Some answer",
                "value": 5,
                "consequence": 1
            },
            {
                "question": "Activity One point five",
                "answer": "Some answer",
                "value": 5,
                "consequence": 1.5
            },
            {
                "question": "Activity x is 2 y is 5",
                "answer": "Some answer",
                "value": 5,
                "consequence": 2
            },
            {
                "question": "Activity Two",
                "answer": "Some answer",
                "value": 4,
                "consequence": 1
            },
            {
                "question": "Activity Three",
                "answer": "Another answer",
                "value": 4,
                "consequence": 2
            },
            {
                "question": "Activity Four",
                "answer": "Another answer",
                "value": 5,
                "consequence": 4
            },
            {
                "question": "Activity Five",
                "answer": "Another answer",
                "value": 4,
                "consequence": 5
            },
            {
                "question": "Activity Six",
                "answer": "Another answer",
                "value": 1,
                "consequence": 1
            },
            {
                "question": "Activity Seven",
                "answer": "Another answer",
                "value": 1,
                "consequence": 5
            }
        ];

        var rScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.value; })])
            .range([2, 20]);

        g.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 7)
            .attr("cx", function (d) { return x(d.consequence); })
            .attr("cy", function (d) { return y(d.value); })
            .style("fill", function (d) {
                if (d.value >= 3 && d.consequence <= 3) { return "#60B19C" } // Top Left
                else if (d.value >= 3 && d.consequence >= 3) { return "#8EC9DC" } // Top Right
                else if (d.value <= 3 && d.consequence >= 3) { return "#D06B47" } // Bottom Left
                else { return "#A72D73" } //Bottom Right         
            }).attr("id", function (d) {
                var id = "point" + d.question.replace(/ /g, "_");
                id = id.replace(/\//g, "-");
                var point = { x: x(d.consequence), y: y(d.value) }
                var onFocus = function () {
                    d3.select("#" + id)
                        .attr("stroke", "blue")
                        .attr("stroke-width", "2");
                };
                var onFocusLost = function () {
                    d3.select("#" + id)
                        .attr("stroke", "none")
                        .attr("stroke-width", "0");
                };
                label_array.push({  x: point.x, 
                                    y: point.y, 
                                    name: d.question, 
                                    width: 0.0, 
                                    height: 0.0, 
                                    onFocus: onFocus, 
                                    onFocusLost: onFocusLost, 
                                    id: id });
                
                anchor_array.push({
                     cx: this.getBBox().x, 
                     cy: this.getBBox().y, 
                     x: point.x, y: point.y, 
                     r: rScale(d.value), 
                     name: d.question, 
                     id: id 
                    });
                    return id;
            });

        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + y.range()[0] / 2 + ")").call(d3.axisBottom(x).ticks(5)
            .tickFormat(function (v) {
                return (v === 0 || v === 6) ? v : "";
            }));

        d3.selectAll("g.x.axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", (y.range()[0] / 2))
            .attr("x2", 0)
            .attr("y2", -(y.range()[0] / 2));

        g.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + x.range()[1] / 2 + ", 0)")
            .call(d3.axisLeft(y).ticks(5).tickFormat(function (v) {
                return (v === 0 || v === 6) ? v : "";
            }));
        d3.selectAll("g.y.axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", -(x.range()[1] / 2))
            .attr("y1", 0)
            .attr("x2", (x.range()[1] / 2))
            .attr("y2", 0);




        var labels = svg.selectAll(".label")
            .data(label_array)
            .enter()
            .append("text")
            .attr("class", "label")
            .text(function (d) {
                return d.name;
            })
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black")
            .on("mouseover", function (d) {
                d3.select(this).attr("fill", "blue");
                d.onFocus();
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("fill", "black");
                d.onFocusLost();
            })
            .attr("id", function (d) {
                d.textId = "text" + d.id;
                
                return "text" + d.id;
            });

//d.lineId = "line" + d.id;

        var links = svg.selectAll(".link")
            .data(anchor_array)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("x1", function (d) { return (d.x); })
            .attr("y1", function (d) { return (d.y); })
            .attr("x2", function (d) { return (d.cx + 27); })
            .attr("y2", function (d) { return (d.cy + 27); })
            .attr("stroke-width", 0.6)
            .attr("stroke", "gray")
            .attr("id", function (d) {
                d.textId = "text" + d.id;
                d.lineId = "line" + d.id;
                return "line" + d.id;
            });
        var index = 0;
        labels.each(function () {
            label_array[index].width = this.getBBox().width;
            label_array[index].height = this.getBBox().height;

            index += 1;
        });

        function ticked() {
            labels.attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y; });
        }
        function simulationEnd() {

            links.attr("x1", function (d) {
                let bbox = (document.getElementById(d.textId) as any).getBBox();
                return bbox.x + (bbox.width / 2);
            })
                .attr("y1", function (d) {
                    let bbox = (document.getElementById(d.textId) as any).getBBox();
                    return bbox.y + bbox.height;
                });
        }

       var repelForce = d3.forceManyBody().strength(-140).distanceMax(80).distanceMin(20);
       var attractForce = d3.forceManyBody().strength(100).distanceMax(100).distanceMin(100);
       var simulation = d3.forceSimulation(label_array)
                            .alphaDecay(0.15)
                            .force("attractForce", attractForce)
                            .force("repelForce", repelForce)
                            .on("tick", ticked)
                            .on("end", simulationEnd);
  

        
        
        //simulation.on("tick", ticked);

        /**function simulationEnd() {

            links.attr("x1", function (d) {
                let bbox = (document.getElementById(d.textId) as any).getBBox();
                return bbox.x + (bbox.width / 2);
            })
                .attr("y1", function (d) {
                    let bbox = (document.getElementById(d.textId) as any).getBBox();
                    return bbox.y + bbox.height;
                });
        }
        simulation.on("end", simulationEnd); **/

    }
}
