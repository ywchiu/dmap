<?php

echo

'<div class="modal-dialog width-800px" role="document" data-latitude="40.7344458" data-longitude="-73.86704922" data-marker-drag="true">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <div class="section-title">
                <h2>Submit</h2>
            </div>
        </div>
        <div class="modal-body">
            <form class="form inputs-underline">
                <section>
                    <h3>About</h3>
                    <div class="row">
                        <div class="col-md-9 col-sm-9">
                            <div class="form-group">
                                <label for="title">Listing Title</label>
                                <input type="text" class="form-control" name="title" id="title" placeholder="Title">
                            </div>
                            <!--end form-group-->
                        </div>
                        <!--end col-md-9-->
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label for="category">Category</label>
                                <select class="form-control selectpicker" name="category" id="category">
                                    <option value="">Category</option>
                                    <option value="1">Restaurant</option>
                                    <option value="2">Event</option>
                                    <option value="3">Adrenaline</option>
                                    <option value="4">Sport</option>
                                    <option value="5">Wellness</option>
                                </select>
                            </div>
                            <!--end form-group-->
                        </div>
                        <!--col-md-3-->
                    </div>
                    <!--end row-->
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" rows="4" name="description" placeholder="Describe the listing"></textarea>
                    </div>
                    <!--end form-group-->
                    <div class="form-group">
                        <label for="tags">Tags</label>
                        <input type="text" class="form-control" name="tags" id="tags" placeholder="+ Add tag">
                    </div>
                    <!--end form-group-->
                </section>
                <section>
                    <h3>Contact</h3>
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="address-autocomplete">Address</label>
                                <input type="text" class="form-control" name="address" id="address-autocomplete" placeholder="Address">
                            </div>
                            <!--end form-group-->
                            <div class="map height-200px shadow" id="map-modal"></div>
                            <!--end map-->
                            <div class="form-group hidden1">
                                <input type="text" class="form-control" id="latitude" name="latitude" hidden1="">
                                <input type="text" class="form-control" id="longitude" name="longitude" hidden1="">
                            </div>
                            <p class="note">Enter the exact address or drag the map marker to position</p>
                        </div>
                        <!--end col-md-6-->
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="region">Listing Region</label>
                                <select class="form-control selectpicker" name="region" id="region">
                                    <option value="">Select Region</option>
                                    <option value="1">New York</option>
                                    <option value="2">Washington</option>
                                    <option value="3">London</option>
                                    <option value="4">Paris</option>
                                </select>
                            </div>
                            <!--end form-group-->
                            <div class="form-group">
                                <label for="phone">Listing Phone</label>
                                <input type="text" class="form-control" name="phone" id="phone" placeholder="Phone number">
                            </div>
                            <!--end form-group-->
                            <div class="form-group">
                                <label for="email">Listing Email</label>
                                <input type="email" class="form-control" name="email" id="email" placeholder="hello@example.com">
                            </div>
                            <!--end form-group-->
                            <div class="form-group">
                                <label for="website">Listing Website</label>
                                <input type="text" class="form-control" name="website" id="website" placeholder="http://">
                            </div>
                            <!--end form-group-->
                        </div>
                        <!--end col-md-6-->
                    </div>
                </section>
                <section>
                    <h3>Gallery</h3>
                    <div class="file-upload-previews"></div>
                    <div class="file-upload">
                        <input type="file" name="files[]" class="file-upload-input with-preview" multiple title="Click to add files" maxlength="10" accept="gif|jpg|png">
                        <span>Click or drag images here</span>
                    </div>
                    <div class="form-group">
                        <label for="video">Video URL</label>
                        <input type="text" class="form-control" name="video" id="video" placeholder="http://">
                    </div>
                    <!--end form-group-->
                </section>
                <section>
                    <h3>Social</h3>
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="facebook">Facebook URL</label>
                                <input type="text" class="form-control" name="facebook" id="facebook" placeholder="http://">
                            </div>
                            <!--end form-group-->
                            <div class="form-group">
                                <label for="youtube">Youtube URL</label>
                                <input type="text" class="form-control" name="youtube" id="youtube" placeholder="http://">
                            </div>
                            <!--end form-group-->
                        </div>
                        <!--end col-md-6-->
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="twitter">Twitter URL</label>
                                <input type="text" class="form-control" name="twitter" id="twitter" placeholder="http://">
                            </div>
                            <!--end form-group-->
                            <div class="form-group">
                                <label for="pinterest">Pinterest URL</label>
                                <input type="text" class="form-control" name="pinterest" id="pinterest" placeholder="http://">
                            </div>
                            <!--end form-group-->
                        </div>
                        <!--end col-md-6-->
                    </div>
                    <!--end row-->
                </section>
                <section>
                    <h3>Opening Hours<span class="note">(optional)</span></h3>
                    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="accordion-heading-1">
                                <h4 class="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#accordion-collapse-1" aria-expanded="false" aria-controls="accordion-collapse-1">
                                        <i class="fa fa-clock-o"></i>Add opening hours
                                    </a>
                                </h4>
                            </div>
                            <!--end panel-heading-->
                            <div id="accordion-collapse-1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="accordion-heading-1">
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-md-4 col-sm-4 horizontal-input-title">
                                            <strong>Monday</strong>
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="open_hours[]" placeholder="Open">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="close_hours[]" placeholder="Close">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                    </div>
                                    <!--end row-->
                                    <div class="row">
                                        <div class="col-md-4 col-sm-4 horizontal-input-title">
                                            <strong>Tuesday</strong>
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="open_hours[]" placeholder="Open">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="close_hours[]" placeholder="Close">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                    </div>
                                    <!--end row-->
                                    <div class="row">
                                        <div class="col-md-4 col-sm-4 horizontal-input-title">
                                            <strong>Wednesday</strong>
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="open_hours[]" placeholder="Open">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="close_hours[]" placeholder="Close">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                    </div>
                                    <!--end row-->
                                    <div class="row">
                                        <div class="col-md-4 col-sm-4 horizontal-input-title">
                                            <strong>Thursday</strong>
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="open_hours[]" placeholder="Open">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="close_hours[]" placeholder="Close">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                    </div>
                                    <!--end row-->
                                    <div class="row">
                                        <div class="col-md-4 col-sm-4 horizontal-input-title">
                                            <strong>Friday</strong>
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="open_hours[]" placeholder="Open">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="close_hours[]" placeholder="Close">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                    </div>
                                    <!--end row-->
                                    <div class="row">
                                        <div class="col-md-4 col-sm-4 horizontal-input-title">
                                            <strong>Saturday</strong>
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="open_hours[]" placeholder="Open">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="close_hours[]" placeholder="Close">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                    </div>
                                    <!--end row-->
                                    <div class="row">
                                        <div class="col-md-4 col-sm-4 horizontal-input-title">
                                            <strong>Sunday</strong>
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="open_hours[]" placeholder="Open">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="close_hours[]" placeholder="Close">
                                            </div>
                                            <!--end form-group-->
                                        </div>
                                        <!--end col-md-4-->
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                            <!--end panel-collapse-->
                        </div>
                        <!--end panel-->
                    </div>
                    <!--end panel-group-->
                </section>
                <section>
                    <h3>Restaurant Menu<span class="note">(optional)</span></h3>
                    <div class="panel-group" id="accordion-2" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="accordion-heading-2">
                                <h4 class="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion-2" href="#accordion-collapse-2" aria-expanded="false" aria-controls="accordion-collapse-2">
                                        <i class="fa fa-cutlery"></i>Add restaurant menu
                                    </a>
                                </h4>
                            </div>
                            <!--end panel-heading-->
                            <div id="accordion-collapse-2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="accordion-heading-2">
                                <div class="panel-body">
                                    <div class="wrapper">
                                        <div class="row">
                                            <div class="col-md-3 col-sm-3"><strong>Title </strong><span class="note">(Optional)</span></div>
                                            <div class="col-md-6 col-sm-6"><strong>Description</strong></div>
                                            <div class="col-md-3 col-sm-3"><strong>Meal Type</strong></div>
                                        </div>
                                        <!--end row-->
                                        <div class="row">
                                            <div class="col-md-3 col-sm-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="menu_title[]" placeholder="Title">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-3-->
                                            <div class="col-md-6 col-sm-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="menu_description[]" placeholder="Description">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-6-->
                                            <div class="col-md-3 col-sm-3">
                                                <div class="form-group">
                                                    <select class="form-control selectpicker" name="menu_type[]">
                                                        <option value="">Select meal type</option>
                                                        <option value="1">Starter</option>
                                                        <option value="2">Soup</option>
                                                        <option value="3">Main Course</option>
                                                        <option value="4">Desert</option>
                                                    </select>
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-3-->
                                        </div>
                                        <!--end row-->
                                        <div class="row">
                                            <div class="col-md-3 col-sm-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="menu_title[]" placeholder="Title">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-3-->
                                            <div class="col-md-6 col-sm-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="menu_description" placeholder="Description">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-6-->
                                            <div class="col-md-3 col-sm-3">
                                                <div class="form-group">
                                                    <select class="form-control selectpicker" name="menu_type[]">
                                                        <option value="">Select meal type</option>
                                                        <option value="1">Starter</option>
                                                        <option value="2">Soup</option>
                                                        <option value="3">Main Course</option>
                                                        <option value="4">Desert</option>
                                                    </select>
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-3-->
                                        </div>
                                        <!--end row-->
                                        <div class="row" id="duplicate-meal">
                                            <div class="col-md-3 col-sm-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="menu_title[]" placeholder="Title">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-3-->
                                            <div class="col-md-6 col-sm-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="menu_description" placeholder="Description">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-6-->
                                            <div class="col-md-3 col-sm-3">
                                                <div class="form-group">
                                                    <select class="form-control selectpicker" name="menu_type[]">
                                                        <option value="">Select meal type</option>
                                                        <option value="1">Starter</option>
                                                        <option value="2">Soup</option>
                                                        <option value="3">Main Course</option>
                                                        <option value="4">Desert</option>
                                                    </select>
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-sm-3-->
                                        </div>
                                        <!--end row-->
                                    </div>
                                    <!--end wrapper-->
                                    <div class="center"><a href="#duplicate-meal" class="btn btn-rounded btn-primary btn-framed btn-light-frame btn-xs icon duplicate"><i class="fa fa-plus"></i>Add another meal</a></div>
                                </div>
                                <!--end panel-body-->
                            </div>
                            <!--end panel-collapse-->
                        </div>
                        <!--end panel-->
                    </div>
                    <!--end panel-group-->
                </section>
                <section>
                    <h3>Schedule<span class="note">(optional)</span></h3>
                    <div class="panel-group" id="accordion-3" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="accordion-heading-3">
                                <h4 class="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion-3" href="#accordion-collapse-3" aria-expanded="false" aria-controls="accordion-collapse-3">
                                        <i class="fa fa-calendar"></i>Add schedule plan
                                    </a>
                                </h4>
                            </div>
                            <!--end panel-heading-->
                            <div id="accordion-collapse-3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="accordion-heading-3">
                                <div class="panel-body">
                                    <div class="wrapper">
                                        <div class="row">
                                            <div class="col-md-2 col-sm-3">
                                                <strong>Date</strong>
                                            </div>
                                            <!--end col-md-2-->
                                            <div class="col-md-2 col-sm-3">
                                                <strong>Time</strong>
                                            </div>
                                            <!--end col-md-2-->
                                            <div class="col-md-4 col-sm-3">
                                                <strong>Place</strong>
                                            </div>
                                            <!--end col-md-3-->
                                            <div class="col-md-4 col-sm-3">
                                                <strong>Address</strong>
                                            </div>
                                            <!--end col-md-4-->
                                        </div>
                                        <div class="row" id="duplicate-schedule">
                                            <div class="col-md-2 col-sm-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="schedule_date[]" placeholder="Date">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-md-2-->
                                            <div class="col-md-2 col-sm-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="schedule_time[]" placeholder="Time">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-md-2-->
                                            <div class="col-md-4 col-sm-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="schedule_place[]" placeholder="Place">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-md-3-->
                                            <div class="col-md-4 col-sm-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="schedule_address[]" placeholder="Address">
                                                </div>
                                                <!--end form-group-->
                                            </div>
                                            <!--end col-md-4-->
                                        </div>
                                        <!--end row-->
                                    </div>
                                    <!--end wrapper-->
                                    <div class="center"><a href="#duplicate-schedule" class="btn btn-rounded btn-primary btn-framed btn-light-frame btn-xs icon duplicate"><i class="fa fa-plus"></i>Add another schedule item</a></div>
                                </div>
                                <!--end panel-body-->
                            </div>
                            <!--end panel-collapse-->
                        </div>
                        <!--end panel-->
                    </div>
                    <!--end panel-group-->
                </section>
                <hr>
                <section class="center">
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-rounded">Preview & Submit Listing</button>
                    </div>
                    <!--end form-group-->
                </section>
            </form>
            <!--end form-->
        </div>
        <!--end modal-body-->
    </div>
    <!--end modal-content-->
</div>
<!--end modal-dialog-->';