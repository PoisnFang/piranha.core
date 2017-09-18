﻿//
// Startup
//
$(document).ready(function () {
    $('.datepicker').datetimepicker({
        format: "YYYY-MM-DD"
    });
});

//
// Tooltips
//
$('body').tooltip({
    selector: '[data-toggle="tooltip"]'
});

//
// Sortable
//
$('.sortable').sortable({
    handle: '.sortable-handle'
}).bind('sortupdate', function(e, ui) {
    manager.tools.recalcregion($(ui.item).parent());
});
$(document).on('click', '.dd-toggle span', function() {
    $(this).parent().parent().toggleClass('expanded');
});

//
// Sortable fix for FF
//
$(document)
    .on('focus', '.region-list-item input, .region-list-item textarea', function () {
        $(this).closest('.region-list-item').attr('draggable', false);
    })
    .on('blur', '.region-list-item input, .region-list-item textarea', function () {
        $(this).closest('.region-list-item').attr('draggable', true);
    });

//
// Panel toggle buttons
//
$(document).on('click', '.panel-heading .btn-toggle', function () {
    var target = $(this).attr('data-target');

    // Remove selecte state
    $(this).siblings('.btn-toggle').removeClass('btn-primary');
    $(this).parent().parent().find('.panel-body').hide();
    $(this).addClass('btn-primary');
    $(target).show();

    return false;
});

//
// Handle region items
//
$(document).on('click', '.addRegionItem', function () {
    var btn = $(this);

    manager.tools.addregion(
        btn.data('targetid'), 
        btn.data('pagetypeid'),
        btn.data('regiontypeid'),
        btn.data('regionindex'),
        btn.data('itemindex'),
        function () {
            btn.data('itemindex', btn.data('itemindex') + 1);
        });
});
$(document).on('click', '.region-actions .delete', function () {
    manager.tools.removeregion($(this));
});

//
// Auto grow textareas
//
$('.single-region textarea.raw-text').css({'overflow': 'hidden'}).autogrow({
    vertical: true, 
    horizontal: false
});

//
// Refresh markdown content
//
$(document).on('keyup', '.markdown textarea.raw-text', function() {
    var md = $(this);

    $.ajax({
        url: '/manager/markdown',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify($(this).val()),
        dataType: 'json',
        success: function(data) {
            md.parent().next().html(data.body);
            //md.next().html(data.body);
        }
    });
});


//
// Toggle menu style
//
$(document).on('click', '.navmenu-brand', function () {
    $('body').toggleClass('collapsed');
    return false;
});


//
// Confirm Delete
//
$(document).on('click', 'a.confirm-delete, button.confirm-delete', function (e) {

    e.preventDefault();
    var data = $(this).data();
    var title = data.title || 'Delete Confirmation';
    var message = data.message || '<p>Are you sure to delete?</p>';
    var url = data.posturl || $(this).attr('href');
    var $modal = $('<div class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times-circle"></i></button><h4 class="modal-title"><i class="fa fa-question-circle"></i> ' + title + '</h4></div><div class="modal-body">' + message + '</div><div class="modal-footer"><form method="post" class="pull-left form-delete" style="display:inline;" action="' + url + '"><button class="btn btn-danger" type="submit"><i class="fa fa-trash-o"></i> Delete</button> <span>Beware, this action can not be undone!</span></form> <button class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</button></div></div></div></div>').appendTo('body');
    $modal.modal('show');
    $modal.on('hidden.bs.modal', function () { $modal.remove(); });
    return false;
});

var manager = {
    tools: {
        markdown: function (str) {
            $.ajax({
                url: '/manager/markdown',
                method: 'POST',
                contentType: 'text/plain',
                data: str,
                success: function (res) {
                    alert(res.Body);
                }
            });
        },

        addregion: function (targetId, pageTypeId, regionTypeId, regionIndex, itemIndex, cb) {
            $.ajax({
                url: '/manager/page/region',
                method: 'POST',
                contentType: 'application/json',
                dataType: 'html',
                data: JSON.stringify({
                    PageTypeId: pageTypeId,
                    RegionTypeId: regionTypeId,
                    RegionIndex: regionIndex,
                    ItemIndex: itemIndex
                }),
                success: function (res) {
                    $(targetId).append(res);

                    if (cb)
                        cb();

                    $('.sortable').sortable('destroy');
                    $('.sortable').sortable({
                        handle: '.sortable-handle'
                    }).bind('sortupdate', function(e, ui) {
                        manager.tools.recalcregion($(ui.item).parent());
                    });
                }
            });
        },

        removeregion: function (button) {
            var region = button.parent().parent().parent();
            var list = button.parent().parent().parent().parent();

            // Remove the region
            region.remove();

            // Recalculate indexes
            manager.tools.recalcregion(list);
        },

        recalcregion: function (region) {
            var items = region.find('.region-list-item');

            for (var n = 0; n < items.length; n++) {
                var inputs = $(items.get(n)).find('input, textarea');

                inputs.attr('id', function (i, val) {
                    return val.replace(/FieldSets_\d+__/, 'FieldSets_' + n + '__');
                });
                inputs.attr('name', function (i, val) {
                    return val.replace(/FieldSets\[\d+\]/, 'FieldSets[' + n + ']');
                });
            }
        }
    }
};