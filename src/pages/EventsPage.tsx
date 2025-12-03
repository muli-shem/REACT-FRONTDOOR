import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchEvents } from '@/redux/slices/orgSlice';
import { Calendar, Clock, MapPin, AlertCircle, Link as LinkIcon, Image } from 'lucide-react';

const EventsPage = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector(state => state.org);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Separate upcoming and past events with safe date handling
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter(event => {
      if (!event || !event.date) return false;
      
      try {
        const eventDate = new Date(event.date);
        if (isNaN(eventDate.getTime())) return false;
        
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      } catch (error) {
        console.warn('Invalid event date for event:', event.id);
        return false;
      }
    })
    .sort((a, b) => {
      try {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } catch (error) {
        return 0;
      }
    });

  const pastEvents = events
    .filter(event => {
      if (!event || !event.date) return false;
      
      try {
        const eventDate = new Date(event.date);
        if (isNaN(eventDate.getTime())) return false;
        
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < today;
      } catch (error) {
        console.warn('Invalid event date for event:', event.id);
        return false;
      }
    })
    .sort((a, b) => {
      try {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } catch (error) {
        return 0;
      }
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Failed to load events</p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(fetchEvents())}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => {
    if (!event.date) {
      console.error('Event missing date:', event);
      return null;
    }

    let eventDate: Date;
    try {
      eventDate = new Date(event.date);
      if (isNaN(eventDate.getTime())) {
        console.error('Invalid event date:', event.date);
        return null;
      }
    } catch (error) {
      console.error('Error parsing event date:', error);
      return null;
    }

    const isToday = eventDate.toDateString() === today.toDateString();

    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition ${
        isPast ? 'opacity-75' : ''
      }`}>
        {/* Event Image (if available) */}
        {event.image ? (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-48 object-cover"
            />
          </div>
        ) : (
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-48">
            <Image className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {/* Date Badge */}
        <div className="flex items-start gap-6 mb-4">
          <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center ${
            isToday ? 'bg-secondary text-primary' :
            isPast ? 'bg-gray-200 text-gray-600' :
            'bg-primary text-white'
          }`}>
            <span className="text-xs font-semibold uppercase">
              {eventDate.toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="text-2xl font-bold">
              {eventDate.getDate()}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 flex-1">
                {event.title || 'Untitled Event'}
              </h3>
              {isToday && (
                <span className="px-3 py-1 bg-secondary text-primary text-xs font-bold rounded-full">
                  TODAY
                </span>
              )}
              {isPast && (
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-full">
                  PAST
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {event.description || 'No description available'}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">
                  {eventDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">
                  {eventDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              {event.venue && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">{event.venue}</span>
                </div>
              )}
              
              {event.link && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <LinkIcon className="w-4 h-4" />
                  <a 
                    href={event.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    Join Event Link
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {!isPast && (
          <div className="pt-4 border-t border-gray-200">
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition">
              RSVP / Mark Attendance
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">
            Stay connected with G-NET community events and activities
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="font-bold text-primary">{events.length}</span>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded"></span>
          Upcoming Events
          <span className="text-lg font-normal text-gray-500">
            ({upcomingEvents.length})
          </span>
        </h2>

        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming events</h3>
            <p className="text-gray-600">Check back soon for new events!</p>
          </div>
        )}
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-gray-400 rounded"></span>
            Past Events
            <span className="text-lg font-normal text-gray-500">
              ({pastEvents.length})
            </span>
          </h2>

          <div className="space-y-4">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} isPast={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;