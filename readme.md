---
title: "Aria-Tree_React"
author: "Philip Williammee"
date: "Sept/02/18"
output: 
  html_document:
     css: ./src/css/components/suport.scss
     self_contained: no

---
# Aria-Tree_React - ORG CHART

Example of aria-tree structure using React

## How to run

Install dependencies:

    yarn install

Run dev server:

    yarn run dev

Open your favorite browser and type in http://localhost:8080

to build output files:

    yarn run webpack
    
    
 <a href="https://ibb.co/kZQUpe"><img src="https://preview.ibb.co/n7129e/org_chart.png" alt="org_chart" border="0"></a>
       <div className='container2' >
            <h2 id="kbd_label">Keyboard Support</h2>
            <table className="def" aria-labelledby="kbd_label" id="kbd_desc">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><kbd>Enter</kbd><br />or&nbsp;<kbd>Space</kbd></th>
                        <td>
                            <ul>
                                <li>Performs the default action (e.g. onclick event) for the focused node.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>    
                        <th><kbd>Down arrow</kbd></th>
                        <td>
                            <ul>
                                <li>Moves focus to the next node that is focusable without opening or closing a node.</li>
                                <li>If focus is on the last node, wraps to the first node.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th><kbd>Up arrow</kbd></th>
                        <td>
                            <ul>
                                <li>Moves focus to the previous node that is focusable without opening or closing a node.</li>
                                <li>If focus is on the first node, wraps to the last node.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th><kbd>Right Arrow</kbd></th>
                        <td>
                            <ul>
                                <li>When focus is on a closed node, opens the node; focus does not move.</li>
                                <li>When focus is on a open node, moves focus to the first child node.</li>
                                <li>When focus is on an end node, does nothing.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th><kbd>Left Arrow</kbd></th>
                        <td>
                            <ul>
                                <li>When focus is on an open node, closes the node.</li>
                                <li>When focus is on a child node that is also either an end node or a closed node, moves
                                    focus to its parent node.</li>
                                <li>When focus is on a root node that is also either an end node or a closed node, does nothing.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th><kbd>Home</kbd></th>
                        <td>Moves focus to first node without opening or closing a node.</td>
                    </tr>
                    <tr>
                        <th><kbd>End</kbd></th>
                        <td>Moves focus to the last node that can be focused without expanding any nodes that are closed.</td>
                    </tr>
                    <tr>
                        <th><kbd>a-z, A-Z</kbd></th>
                        <td>
                            <ul>
                                <li>Focus moves to the next node with a name that starts with the typed character.</li>
                                <li>Search wraps to first node if a matching name is not found among the nodes that follow
                                    the focused node.</li>
                                <li>Search ignores nodes that are descendants of closed nodes.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
