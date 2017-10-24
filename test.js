import test from 'ava';
import Paginator from './index';

const paginator = new Paginator(20, 11);
const info  = paginator.build(1000, 7);

test('total_page', t => {
  t.is(info.total_pages, 50);
});

test('current_page', t => {
  t.is(info.current_page, 7);
});

test('first_page', t => {
  t.is(info.first_page, 2)
})

test('last_page', t => {
  t.is(info.last_page, 12)
})

test('previous_page', t => {
  t.is(info.previous_page, 6)
})

test('next_page', t => {
  t.is(info.next_page, 8)
})

test('has_previous_page', t => {
  t.is(info.has_previous_page, true)
})

test('has_next_page', t => {
  t.is(info.has_next_page, true)
})

test('total_results', t => {
  t.is(info.total_results, 1000)
})

test('results', t => {
  t.is(info.results, 20)
})
