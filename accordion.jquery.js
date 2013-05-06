    var accordionOptions = {
        showMultipleAreas : false,
        showCollapseAndExpand : true,
        collapseAndExpand : {
            showAsOneButton : true
        }        
    };
    
    var menuOptions = {
        headerClass : 'menu-header',
        contentClass : 'menu-content',
        expandClass : 'menu-expanded',        
        showFirstArea : true,
        oneAreaAlwaysVisible : true,            
        showMultipleAreas : false,
    };            

    var faqOptions = {
        selector : '#faq',
        headerClass : 'faq-question',
        contentClass : 'faq-answer',
        expandClass : 'faq-expanded',
        showFirstArea : true,
        showMultipleAreas : true,     
        showCollapseAndExpand : true,
        collapseAndExpand : {
            expandAllClass :  'faq-expand-all',
            collapseAllClass : 'faq-collapse-all'
        }  
    };
     
    var tabOptions = {
        showFirstArea : true,
        oneAreaAlwaysVisible : true,        
        headerClass : 'tab-header',
        contentClass : 'tab-content',
        expandClass : 'tab-expanded',
    };            
    

    $(function(){

        $(".accordion").accordion(accordionOptions);
        $(".menu").accordion(menuOptions);
        $("#faq").accordion(faqOptions);
        $("#tab").accordion(tabOptions);

        
        $('#faq').on('accordion-collapse-all accordion-expand-all accordion-click', function (event){
          $('.listener').html('<strong><u>' + event.type + '</u></strong> triggered!');
        });

        presentation.init();

    });
