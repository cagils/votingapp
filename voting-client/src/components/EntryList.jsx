import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import classNames from 'classnames';

export const EntryList = React.createClass({
  mixins: [PureRenderMixin],
  isStriked: function(entry) {
    let t = this.props.strikedEntries.includes(entry);
    return t;
  },
  mapper: function(alist) {
    let result = alist.toKeyedSeq().toArray().map( (v, k) => (
      <div key={k} className={classNames("list-entry", {"striked": this.isStriked(v)})} onClick={() => this.props.strike(v)}>
        {v}
      </div>
    ));
    return result;
  },
  componentDidMount: function() {

  },
  render: function() {
    return <div className="list-entry-container">
    {this.mapper(this.props.initialEntries)}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    initialEntries: state.getIn(['initialEntries']),
    strikedEntries: state.getIn(['strikedEntries'])
  }
}

export const EntryListContainer = connect(
  mapStateToProps,
  actionCreators
)(EntryList);
