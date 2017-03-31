document.addEventListener('DOMContentLoaded', function() { // on dom ready

    var cy = cytoscape({
        container: document.querySelector('#cy'),


        layout: {
            name: 'dagre',
            rankDir: 'LR'
        },

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'shape': 'data(faveShape)',
                'width': 'mapData(weight, 40, 80, 20, 60)',
                'content': 'data(name)',
                'text-valign': 'center',
                'text-outline-width': 2,
                'text-outline-color': 'data(faveColor)',
                'background-color': 'data(faveColor)',
                'color': '#fff'
            })
            .selector(':selected')
            .css({
                'border-width': 3,
                'border-color': '#333'
            })
            .selector('edge')
            .css({
                'curve-style': 'bezier',
                'opacity': 0.666,
                'width': 'mapData(strength, 70, 100, 2, 6)',
                'target-arrow-shape': 'triangle',
                'source-arrow-shape': 'circle',
                'line-color': 'data(faveColor)',
                'source-arrow-color': 'data(faveColor)',
                'target-arrow-color': 'data(faveColor)'
            })
            .selector('edge.questionable')
            .css({
                'line-style': 'dotted',
                'target-arrow-shape': 'diamond'
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            }),

        elements: {
            nodes: [
                { data: { id: 'a', name: 'Activation', weight: 50, faveColor: '#6FB1FC', faveShape: 'rectangle' } },
                { data: { id: 'b', name: 'User Profile', weight: 45, faveColor: '#EDA1ED', faveShape: 'rectangle' } },
                { data: { id: 'c', name: 'Billing', weight: 75, faveColor: '#86B342', faveShape: 'rectangle' } },
                { data: { id: 'd', name: 'Sales', weight: 70, faveColor: '#F5A45D', faveShape: 'rectangle' } },
                { data: { id: 'e', name: 'Device', weight: 70, faveColor: '#F5A45D', faveShape: 'rectangle' } },
                { data: { id: 'f', name: 'Loan', weight: 70, faveColor: '#F5A45D', faveShape: 'rectangle' } },
                { data: { id: 'j', name: 'Support', weight: 70, faveColor: '#F5A45D', faveShape: 'rectangle' } },
                { data: { id: 'k', name: 'Sink Event', weight: 70, faveColor: '#F5A45D', faveShape: 'rectangle' } }
            ],
            edges: [
                { data: { source: 'a', target: 'b', faveColor: '#6FB1FC', strength: 90 } },
                { data: { source: 'b', target: 'c', faveColor: '#6FB1FC', strength: 70 } },
                { data: { source: 'c', target: 'd', faveColor: '#6FB1FC', strength: 80 } },
                { data: { source: 'c', target: 'e', faveColor: '#EDA1ED', strength: 95 } },
                { data: { source: 'c', target: 'f', faveColor: '#EDA1ED', strength: 60 }, classes: 'questionable' },

                { data: { source: 'e', target: 'j', faveColor: '#86B342', strength: 100 } },
                { data: { source: 'e', target: 'k', faveColor: '#86B342', strength: 100 } }
            ]
        }
    });

    cy.on('tap', 'node', function(e) {
        var node = e.cyTarget;
        var neighborhood = node.neighborhood().add(node);

        cy.elements().addClass('faded');
        neighborhood.removeClass('faded');
    });

    cy.on('tap', function(e) {
        if (e.cyTarget === cy) {
            cy.elements().removeClass('faded');
        }
    });

}); // on dom ready