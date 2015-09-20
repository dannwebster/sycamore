var eventHooks = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.userId = Meteor.userId();
        console.log(doc)
        doc.startDate = moment(doc.startDate, "MM-DD-YYYY h:mm a").format('X');
        doc.endDate = moment(doc.endDate, "MM-DD-YYYY h:mm a").format('X');
        console.log(doc)
        return doc;
      }
    }
  },
  docToForm: function(doc) {
    if (_.isArray(doc.tags)) {
      doc.tags = doc.tags.join(", ");
    }
    return doc;
  },
  formToDoc: function(doc) {
    if (typeof doc.tags === "string") {
      doc.tags = doc.tags.split(",");
    }
    return doc;
  }
}

AutoForm.addHooks('insertEventForm', eventHooks);
