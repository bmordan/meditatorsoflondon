Meteor.startup(function () {
  if (Meteor.isCordova) {
    window.shouldRotateToOrientation = (degrees) => true
  }
})

toastr.options = {
  positionClass: 'toast-top-center',
  timeOut: 4000,
  closeButton: true
}
