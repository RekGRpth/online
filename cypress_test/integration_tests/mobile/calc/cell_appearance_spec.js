/* global describe it cy beforeEach require afterEach expect*/

var helper = require('../../common/helper');
var calcHelper = require('../../common/calc_helper');
var mobileHelper = require('../../common/mobile_helper');
var calcMobileHelper = require('./calc_mobile_helper');

describe('Change cell appearance.', function() {
	var testFileName = 'cell_appearance.ods';

	beforeEach(function() {
		mobileHelper.beforeAllMobile(testFileName, 'calc');

		// Click on edit button
		mobileHelper.enableEditingMobile();
	});

	afterEach(function() {
		helper.afterAll(testFileName);
	});

	function openAppearencePanel() {
		mobileHelper.openMobileWizard();

		cy.get('#ScCellAppearancePropertyPanel')
			.click();

		cy.contains('.menu-entry-with-icon', 'Background Color')
			.should('be.visible');
	}

	function openAppearencePanelOnFirtsCell() {
		calcHelper.clickOnFirstCell();

		openAppearencePanel();
	}

	function openAppearencePanelOnAllCells() {
		calcMobileHelper.selectAllMobile();

		openAppearencePanel();
	}

	it('Apply background color', function() {
		openAppearencePanelOnFirtsCell();

		// Select a new color
		cy.get('#BackgroundColor')
			.click();

		mobileHelper.selectFromColorPalette(1, 2);

		// Check that the color is shown as selected
		cy.get('#BackgroundColor .color-sample-selected')
			.should('have.attr', 'style', 'background-color: rgb(255, 0, 0);');

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'bgcolor', '#FF0000');
	});

	it('Apply left border', function() {
		openAppearencePanelOnFirtsCell();

		cy.get('#border-2')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-left: 1px solid #000000');
	});

	it('Remove cell border', function() {
		openAppearencePanelOnFirtsCell();

		// First add left border
		cy.get('#border-2')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-left: 1px solid #000000');

		// Then remove it
		openAppearencePanelOnFirtsCell();

		cy.get('#border-1')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('not.have.attr', 'style');
	});

	it('Apply right border', function() {
		openAppearencePanelOnFirtsCell();

		cy.get('#border-3')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-right: 1px solid #000000');
	});

	it('Apply left and right border', function() {
		openAppearencePanelOnFirtsCell();

		cy.get('#border-4')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-left: 1px solid #000000; border-right: 1px solid #000000');
	});

	it('Apply top border', function() {
		openAppearencePanelOnFirtsCell();

		cy.get('#border-5')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-top: 1px solid #000000');
	});

	it('Apply bottom border', function() {
		openAppearencePanelOnFirtsCell();

		cy.get('#border-6')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-bottom: 1px solid #000000');
	});

	it('Apply top and bottom border', function() {
		openAppearencePanelOnFirtsCell();

		cy.get('#border-7')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000');
	});

	it('Apply border for all sides', function() {
		openAppearencePanelOnFirtsCell();

		cy.get('#border-8')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000');
	});

	it('Apply horizontal borders for multiple cells', function() {
		openAppearencePanelOnAllCells();

		cy.get('#border-9')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should(function(cells) {
				expect(cells).to.have.lengthOf(4);
				for (var i = 0; i < cells.length; i++) {
					expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000');
				}
			});
	});

	it('Apply horizontal inner borders and vertical outer borders', function() {
		openAppearencePanelOnAllCells();

		cy.get('#border-10')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should(function(cells) {
				expect(cells).to.have.lengthOf(4);
				for (var i = 0; i < cells.length; i++) {
					if (i == 0)
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000');
					else if (i == 1)
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000');
					else if (i == 2)
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000');
					else
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000');
				}
			});
	});

	it('Apply vertical inner borders and horizontal outer borders', function() {
		openAppearencePanelOnAllCells();

		cy.get('#border-11')
			.click();

		// TODO
		cy.wait(200);

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should(function(cells) {
				expect(cells).to.have.lengthOf(4);
				for (var i = 0; i < cells.length; i++) {
					if (i == 0)
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000');
					else if (i == 1)
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000');
					else if (i == 2)
						expect(cells[i]).to.have.attr('style', 'border-left: 1px solid #000000; border-right: 1px solid #000000');
					else
						expect(cells[i]).to.have.attr('style', 'border-left: 1px solid #000000; border-right: 1px solid #000000');
				}
			});
	});

	it('Apply all inner and outer borders', function() {
		openAppearencePanelOnAllCells();

		cy.get('#border-12')
			.click();

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should(function(cells) {
				expect(cells).to.have.lengthOf(4);
				for (var i = 0; i < cells.length; i++) {
					if (i == 0)
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000');
					else if (i == 1)
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000');
					else if (i == 2)
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000');
					else
						expect(cells[i]).to.have.attr('style', 'border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000');
				}
			});
	});

	it('Apply border color', function() {
		openAppearencePanelOnFirtsCell();

		// Apply left border first
		cy.get('#border-2')
			.click();

		// Then apply border color
		cy.get('#FrameLineColor')
			.click();

		mobileHelper.selectFromColorPalette(2, 3);

		// Check that the color is shown as selected
		cy.get('#FrameLineColor .color-sample-selected')
			.should('have.attr', 'style', 'background-color: rgb(255, 153, 0);');

		calcMobileHelper.selectAllMobile();

		cy.get('#copy-paste-container table td')
			.should('have.attr', 'style', 'border-left: 1px solid #ff9900');
	});
});
