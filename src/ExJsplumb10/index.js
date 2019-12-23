import React, { Component } from 'react';
import './style.css';
import jsplumb from 'jsplumb';
import $ from 'jquery';

export default class ExJsplumb10 extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }
  componentDidMount() {
    jsplumb.jsPlumb.ready(() => {
      // list of possible anchor locations for the blue source element
      var sourceAnchors = [
        [0, 1, 0, 1],
        [0.25, 1, 0, 1],
        [0.5, 1, 0, 1],
        [0.75, 1, 0, 1],
        [1, 1, 0, 1]
      ];
      var instance = (window.instance = jsplumb.jsPlumb.getInstance({
        // drag options
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        // default to a gradient stroke from blue to green.
        PaintStyle: {
          gradient: {
            stops: [[0, "#0d78bc"], [1, "#558822"]]
          },
          stroke: "#558822",
          strokeWidth: 10
        },
        Container: "canvas"
      }));
      // click listener for the enable/disable link in the source box (the blue one).
      /* jsPlumb.on(
        document.getElementById("enableDisableSource"),
        "click",
        function(e) {
          var sourceDiv = (e.target || e.srcElement).parentNode;
          var state = instance.toggleSourceEnabled(sourceDiv);
          this.innerHTML = state ? "disable" : "enable";
          jsPlumb[state ? "removeClass" : "addClass"](
            sourceDiv,
            "element-disabled"
          );
          jsPlumbUtil.consume(e);
        }
      ); */
      // click listener for enable/disable in the small green boxes
      /* jsPlumb.on(
        document.getElementById("canvas"),
        "click",
        ".enableDisableTarget",
        function(e) {
          var targetDiv = (e.target || e.srcElement).parentNode;
          var state = instance.toggleTargetEnabled(targetDiv);
          this.innerHTML = state ? "disable" : "enable";
          jsPlumb[state ? "removeClass" : "addClass"](
            targetDiv,
            "element-disabled"
          );
          jsPlumbUtil.consume(e);
        }
      ); */
      // bind to a connection event, just for the purposes of pointing out that it can be done.
      instance.bind("connection", function(i, c) {
        console.log("connection", i.connection);
      });
      // get the list of ".smallWindow" elements.
      var smallWindows = jsplumb.jsPlumb.getSelector(".smallWindow");
      // make them draggable
      instance.draggable(smallWindows, {
        filter: ".enableDisableTarget"
      });
      // suspend drawing and initialise.
      instance.batch(function() {
        // make 'window1' a connection source. notice the filter and filterExclude parameters: they tell jsPlumb to ignore drags
        // that started on the 'enable/disable' link on the blue window.
        instance.makeSource("sourceWindow1", {
          filter: "a",
          filterExclude: true,
          maxConnections: -1,
          endpoint: ["Dot", { radius: 7, cssClass: "small-blue" }],
          anchor: sourceAnchors
        });
        // configure the .smallWindows as targets.
        instance.makeTarget(smallWindows, {
          dropOptions: { hoverClass: "hover" },
          anchor: "Top",
          endpoint: ["Dot", { radius: 11, cssClass: "large-green" }]
        });
        // and finally connect a couple of small windows, just so its obvious what's going on when this demo loads.
        instance.connect({ source: "sourceWindow1", target: "targetWindow5" });
        instance.connect({ source: "sourceWindow1", target: "targetWindow2" });
      });
      jsplumb.jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });
     
  }

  render() {
    return (
      <>
       <div className="jtk-demo">
    <div className="jtk-demo-canvas canvas-wide source-target-demo jtk-surface jtk-surface-nopan" id="canvas">
      <div className="window" id="sourceWindow1">
        <strong>Window 1</strong>
        <a href="#" id="enableDisableSource">disable</a>
      </div>
      <div className="window smallWindow" id="targetWindow2">
        <strong>Window 2</strong>
        <a href="#" className="enableDisableTarget">disable</a><br/><br/></div>
      <div className="window smallWindow" id="targetWindow3">
        <strong>Window 3</strong>
        <a href="#" className="enableDisableTarget">disable</a><br/><br/></div>
      <div className="window smallWindow" id="targetWindow4">
        <strong>Window 4</strong>
        <a href="#" className="enableDisableTarget">disable</a><br/><br/></div>
      <div className="window smallWindow" id="targetWindow5">
        <strong>Window 5</strong>
        <a href="#" className="enableDisableTarget">disable</a><br/><br/></div>
      <div className="window smallWindow" id="targetWindow6">
        <strong>Window 6</strong>
        <a href="#" className="enableDisableTarget">disable</a><br/><br/></div>
    </div>
  </div>
      </>
    );
  }
}


