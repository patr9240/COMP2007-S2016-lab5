﻿// IIFE
(function () {
    let cartValue: string;
    let hasDeletion: boolean = false;
    // Document.ready -> link up remove event handler
    $(".RemoveLink").click(function () {
        // Get the id from the link
        let recordToDelete:string = $(this).attr("data-id");
        if (recordToDelete != '') {
            // Perform the ajax post
            $.post("/ShoppingCart/RemoveFromCart/" + recordToDelete,
                function (data) {
                    // Successful requests get here
                    // Update the page elements
                    if (data.ItemCount == 0) {
                        $('#row-' + data.DeleteId).fadeOut('slow');
                    } else {
                        $('#item-count-' + data.DeleteId).text(data.ItemCount);
                    }
                    $('#cart-total').text(data.CartTotal);
                    cartValue = data.cartTotal;
                    hasDeletion = true;
                    $('#update-message').text(data.Message);
                    $('#cart-status').text('Cart (' + data.CartCount + ')');
                });
        }
    });

    if (!hasDeletion) {
        cartValue = $("#shoppingCart").html();
    }
    $("#shoppingCart").html(" <span class='badge'> " + cartValue + " </span>");

})();