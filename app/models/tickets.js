const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = mongoose.Schema;

const Ticket = mongoose.Schema({
    user: { type: schema.Types.ObjectId, ref: 'User' },
    code: { type: String, required: true },
    title: { type: String, default:'' },
    text: { type: String, default:'' },
    check: { type: Boolean, default: true },
    parent: { type: String, ref: 'Ticket', default: null }
    // parent: { type: schema.Types.ObjectId, ref: 'Ticket', default: null }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

Ticket.plugin(mongoosePaginate);

Ticket.virtual('tickets', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'parent'
});

module.exports = mongoose.model('Ticket', Ticket);