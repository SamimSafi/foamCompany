import FullCalendar, { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
//
import { useState, useRef, useEffect } from 'react';
// @mui
import { Card, Button, Container, DialogTitle } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import {
  getEvents,
  openModal,
  closeModal,
  updateEvent,
  selectEvent,
  selectRange,
} from '../../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
// @types
import { CalendarView } from '../../@types/calendar';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
// import { CalendarForm, CalendarStyle, CalendarToolbar } from '../../sections/@dashboard/calendar';

// ----------------------------------------------------------------------

const selectedEventSelector = (state: RootState) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

export default function Calendar() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const isDesktop = useResponsive('up', 'sm');

  const calendarRef = useRef<FullCalendar>(null);

  const [date, setDate] = useState(new Date());

  const [view, setView] = useState<CalendarView>(isDesktop ? 'dayGridMonth' : 'listWeek');

  const selectedEvent = useSelector(selectedEventSelector);


  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    dispatch(selectEvent(arg.event.id));
  };



  const handleDropEvent = async ({ event }: EventDropArg) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Page title="Calendar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Calendar"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Calendar' }]}
          moreLink="https://fullcalendar.io/docs/react"
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              onClick={handleAddEvent}
            >
              New Event
            </Button>
          }
        />



  
      </Container>
    </Page>
  );
}
