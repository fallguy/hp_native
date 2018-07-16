import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    Alert,
    Text,
    View
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

  
/*
        var quotes = 
        [
            {
                quote: 'Lemme get uhh boneless pizza',
                author: 'Eric Salveson'
            },
            {
                quote: 'I just wanna watch the words and laugh',
                author: 'Jordan Lovato'
            },
            {
                quote: 'wha happun',
                author: 'Sparkle Cleaners Guy'
            },
            {
                quote: 'Are you down with the clown?',
                author: 'Tony Gemma'
            },
            {
                quote: 'Mess me up with McDoubles fam',
                author: 'Drunk guy in McDonalds drive-thru'
            }
        ];
*/
        var quotes = 
            [
                {
                    "quote": "Success is most often achieved by those who don't know that failure is inevitable.",
                    "author": "Coco Chanel"
                },
                {
                    "quote": "Things work out best for those who make the best of how things work out.",
                    "author": "John Wooden"
                },
                {
                    "quote": "Courage is grace under pressure.",
                    "author": "Ernest Hemingway"
                },
                {
                    "quote": "If you are not willing to risk the usual, you will have to settle for the ordinary.",
                    "author": "Jim Rohn"
                },
                {
                    "quote": "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.",
                    "author": "Albert Einstein"
                },
                {
                    "quote": "Take up one idea. Make that one idea your life -- think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body be full of that idea, and just leave every other idea alone. This is the way to success.",
                    "author": "Swami Vivekananda"
                },
                {
                    "quote": "Sometimes you can't see yourself clearly until you see yourself through the eyes of others.",
                    "author": "Ellen DeGeneres"
                },
                {
                    "quote": "All our dreams can come true if we have the courage to pursue them.",
                    "author": "Walt Disney"
                },
                {
                    "quote": "It does not matter how slowly you go, so long as you do not stop.",
                    "author": "Confucius"
                },
                {
                    "quote": "Success is walking from failure to failure with no loss of enthusiasm.",
                    "author": "Winston Churchill"
                },
                {
                    "quote": "Someone is sitting in the shade today because someone planted a tree a long time ago.",
                    "author": "Warren Buffett"
                },
                {
                    "quote": "Whenever you see a successful person, you only see the public glories, never the private sacrifices to reach them.",
                    "author": "Vaibhav Shah"
                },
                {
                    "quote": "Don't cry because it's over, smile because it happened.",
                    "author": "Dr. Seuss"
                },
                {
                    "quote": "Success? I don't know what that word means. I'm happy. But success, that goes back to what in somebody's eyes success means. For me, success is inner peace. That's a good day for me.",
                    "author": "Denzel Washington"
                },
                {
                    "quote": "You only live once, but if you do it right, once is enough.",
                    "author": "Mae West"
                },
                {
                    "quote": "Opportunities don't happen. You create them.",
                    "author": "Chris Grosser"
                },
                {
                    "quote": "Once you choose hope, anything's possible.",
                    "author": "Christopher Reeve"
                },
                {
                    "quote": "Try not to become a person of success, but rather try to become a person of value.",
                    "author": "Albert Einstein"
                },
                {
                    "quote": "There is no easy walk to freedom anywhere, and many of us will have to pass through the valley of the shadow of death again and again before we reach the mountaintop of our desires.",
                    "author": "Nelson Mandela"
                },
                {
                    "quote": "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
                    "author": "Charles Darwin"
                },
                {
                    "quote": "The best and most beautiful things in the world cannot be seen or even touched -- they must be felt with the heart.",
                    "author": "Helen Keller"
                },
                {
                    "quote": "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
                    "author": "Eleanor Roosevelt"
                },
                {
                    "quote": "Live as if you were to die tomorrow. Learn as if you were to live forever.",
                    "author": "Mahatma Gandhi"
                },
                {
                    "quote": "The best revenge is massive success.",
                    "author": "Frank Sinatra"
                },
                {
                    "quote": "The difference between winning and losing is most often not quitting.",
                    "author": "Walt Disney"
                },
                {
                    "quote": "I have not failed. I've just found 10,000 ways that won't work.",
                    "author": "Thomas Edison"
                },
                {
                    "quote": "When you cease to dream you cease to live.",
                    "author": "Malcolm Forbes"
                },
                {
                    "quote": "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
                    "author": "David Brinkley"
                },
                {
                    "quote": "May you live every day of your life.",
                    "author": "Jonathan Swift"
                },
                {
                    "quote": "No one can make you feel inferior without your consent.",
                    "author": "Eleanor Roosevelt"
                },
                {
                    "quote": "Failure is another steppingstone to greatness.",
                    "author": "Oprah Winfrey"
                },
                {
                    "quote": "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.",
                    "author": "Henry Ford"
                },
                {
                    "quote": "If you're not stubborn, you'll give up on experiments too soon. And if you're not flexible, you'll pound your head against the wall and you won't see a different solution to a problem you're trying to solve.",
                    "author": "Jeff Bezos"
                },
                {
                    "quote": "If you're going through hell, keep going.",
                    "author": "Winston Churchill"
                },
                {
                    "quote": "In order to be irreplaceable one must always be different.",
                    "author": "Coco Chanel"
                },
                {
                    "quote": "What seems to us as bitter trials are often blessings in disguise.",
                    "author": "Oscar Wilde"
                },
                {
                    "quote": "You miss 100 percent of the shots you don't take.",
                    "author": "Wayne Gretzky"
                },
                {
                    "quote": "The distance between insanity and genius is measured only by success.",
                    "author": "Bruce Feirstein"
                },
                {
                    "quote": "The way I see it, if you want the rainbow, you gotta put up with the rain.",
                    "author": "Dolly Parton"
                },
                {
                    "quote": "To me, business isn't about wearing suits or pleasing stockholders. It's about being true to yourself, your ideas and focusing on the essentials.",
                    "author": "Branson"
                },
                {
                    "quote": "The longer I live, the more beautiful life becomes.",
                    "author": "Frank Lloyd Wright"
                },
                {
                    "quote": "Happiness is a butterfly, which when pursued, is always beyond your grasp, but which, if you will sit down quietly, may alight upon you.",
                    "author": "Nathaniel Hawthorne"
                },
                {
                    "quote": "You must expect great things of yourself before you can do them.",
                    "author": "Michael Jordan"
                },
                {
                    "quote": "If you can't explain it simply, you don't understand it well enough.",
                    "author": "Albert Einstein"
                },
                {
                    "quote": "You can't please everyone, and you can't make everyone like you.",
                    "author": "Katie Couric"
                },
                {
                    "quote": "There are two types of people who will tell you that you cannot make a difference in this world: those who are afraid to try and those who are afraid you will succeed.",
                    "author": "Ray Goforth"
                },
                {
                    "quote": "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
                    "author": "Armstrong"
                },
                {
                    "quote": "Start where you are. Use what you have. Do what you can.",
                    "author": "Arthur Ashe"
                },
                {
                    "quote": "Don't limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.",
                    "author": "Kay Ash"
                },
                {
                    "quote": "People ask, 'What's the best role you've ever played?' The next one.",
                    "author": "Kevin Kline"
                },
                {
                    "quote": "The two most important days in your life are the day you are born and the day you find out why.",
                    "author": "Mark Twain"
                },
                {
                    "quote": "I find that the harder I work, the more luck I seem to have.",
                    "author": "Thomas Jefferson"
                },
                {
                    "quote": "It often requires more courage to dare to do right than to fear to do wrong.",
                    "author": "Abraham Lincoln"
                },
                {
                    "quote": "Success is the sum of small efforts, repeated day-in and day-out.",
                    "author": "Robert Collier"
                },
                {
                    "quote": "As you grow older, you will discover that you have two hands, one for helping yourself, the other for helping others.",
                    "author": "Audrey Hepburn"
                },
                {
                    "quote": "If you want to achieve excellence, you can get there today. As of this second, quit doing less-than-excellent work.",
                    "author": "Thomas J. Watson"
                },
                {
                    "quote": "If your actions inspire others to dream more, learn more, do more, and become more, you are a leader.",
                    "author": "John Quincy Adams"
                },
                {
                    "quote": "All progress takes place outside the comfort zone.",
                    "author": "Michael John Bobak"
                },
                {
                    "quote": "The more you praise and celebrate your life, the more there is in life to celebrate.",
                    "author": "Oprah Winfrey"
                },
                {
                    "quote": "You may only succeed if you desire succeeding; you may only fail if you do not mind failing.",
                    "author": "Philippos"
                },
                {
                    "quote": "A dream doesn't become reality through magic; it takes sweat, determination, and hard work.",
                    "author": "Powell"
                },
                {
                    "quote": "Only put off until tomorrow what you are willing to die having left undone.",
                    "author": "Pablo Picasso"
                },
                {
                    "quote": "The biggest risk is not taking any risk... In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
                    "author": "Mark Zuckerberg"
                },
                {
                    "quote": "We become what we think about most of the time, and that's the strangest secret.",
                    "author": "Earl Nightingale"
                },
                {
                    "quote": "Do one thing every day that scares you.",
                    "author": "Eleanor Roosevelt"
                },
                {
                    "quote": "The only place where success comes before work is in the dictionary.",
                    "author": "Vidal Sassoon"
                },
                {
                    "quote": "Don't be afraid to give up the good to go for the great.",
                    "author": "John D. Rockefeller"
                },
                {
                    "quote": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
                    "author": "Jobs"
                },
                {
                    "quote": "Don't worry about failure; you only have to be right once.",
                    "author": "Drew Houston"
                },
                {
                    "quote": "Though no one can go back and make a brand-new start, anyone can start from now and make a brand-new ending.",
                    "author": "Carl Bard"
                },
                {
                    "quote": "Nothing great was ever achieved without enthusiasm.",
                    "author": "Ralph Waldo Emerson"
                },
                {
                    "quote": "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.",
                    "author": "Mark Twain"
                },
                {
                    "quote": "Keep your face to the sunshine and you can never see the shadow.",
                    "author": "Helen Keller"
                },
                {
                    "quote": "The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.",
                    "author": "Mark Caine"
                },
                {
                    "quote": "One of the greatest diseases is to be nobody to anybody.",
                    "author": "Mother Teresa"
                },
                {
                    "quote": "Identity is a prison you can never escape, but the way to redeem your past is not to run from it, but to try to understand it, and use it as a foundation to grow.",
                    "author": "Jay-Z"
                },
                {
                    "quote": "The successful warrior is the average man, with laser-like focus.",
                    "author": "Bruce Lee"
                },
                {
                    "quote": "Rarely have I seen a situation where doing less than the other guy is a good strategy.",
                    "author": "Jimmy Spithill"
                },
                {
                    "quote": "If you always do what interests you, at least one person is pleased.",
                    "author": "Katharine Hepburn"
                },
                {
                    "quote": "Keep on going, and the chances are that you will stumble on something, perhaps when you are least expecting it. I never heard of anyone ever stumbling on something sitting down.",
                    "author": "Charles F. Kettering"
                },
                {
                    "quote": "I avoid looking forward or backward, and try to keep looking upward.",
                    "author": "Charlotte Bronte"
                },
                {
                    "quote": "You can't connect the dots looking forward; you can only connect them looking backward. So you have to trust that the dots will somehow connect in your future. You have to trust in something -- your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.",
                    "author": "Steve Jobs"
                },
                {
                    "quote": "Life is short, and it is here to be lived.",
                    "author": "Kate Winslet"
                },
                {
                    "quote": "Everything you can imagine is real.",
                    "author": "Pablo Picasso"
                },
                {
                    "quote": "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.",
                    "author": "Barack Obama"
                },
                {
                    "quote": "If you want to make a permanent change, stop focusing on the size of your problems and start focusing on the size of you!",
                    "author": "T. Harv Eker"
                },
                {
                    "quote": "Successful people do what unsuccessful people are not willing to do. Don't wish it were easier; wish you were better.",
                    "author": "Jim Rohn"
                },
                {
                    "quote": "It is never too late to be what you might have been.",
                    "author": "George Eliot"
                },
                {
                    "quote": "If you love what you do and are willing to do what it takes, it's within your reach. And it'll be worth every minute you spend alone at night, thinking and thinking about what it is you want to design or build.",
                    "author": "Steve Wozniak"
                },
                {
                    "quote": "In my experience, there is only one motivation, and that is desire. No reasons or principle contain it or stand against it.",
                    "author": "Jane Smiley"
                },
                {
                    "quote": "In the midst of movement and chaos, keep stillness inside of you.",
                    "author": "Deepak Chopra"
                },
                {
                    "quote": "Success does not consist in never making mistakes but in never making the same one a second time.",
                    "author": "George Bernard Shaw"
                },
                {
                    "quote": "I don't want to get to the end of my life and find that I lived just the length of it. I want to have lived the width of it as well.",
                    "author": "Diane Ackerman"
                },
                {
                    "quote": "As we look ahead into the next century, leaders will be those who empower others.",
                    "author": "Bill Gates"
                },
                {
                    "quote": "Our greatest fear should not be of failure... but of succeeding at things in life that don't really matter.",
                    "author": "Francis Chan"
                },
                {
                    "quote": "Be yourself. Everyone else is already taken.",
                    "author": "Oscar Wilde"
                },
                {
                    "quote": "If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much.",
                    "author": "Jim Rohn"
                },
                {
                    "quote": "But you have to do what you dream of doing even while you're afraid.",
                    "author": "Arianna Huffington"
                },
                {
                    "quote": "To be successful, you must accept all challenges that come your way. You can't just accept the ones you like.",
                    "author": "Mike Gafka"
                },
                {
                    "quote": "Be patient with yourself. Self-growth is tender; it's holy ground. There's no greater investment.",
                    "author": "Stephen Covey"
                },
                {
                    "quote": "Many of life's failures are people who did not realize how close they were to success when they gave up.",
                    "author": "Thomas A. Edison"
                }
            ];


export default class QuotePage extends Component {

    constructor(props) {
        super(props);
            this.state = {
                randQuote: [],
                randAuth: []
            };
        }

        componentWillMount() {
            var newRand = Math.floor(Math.random() * quotes.length);
            var rand = quotes[newRand];
            this.setState({
                randQuote: rand.quote
            });
            this.setState({
                randAuth: rand.author
            });
            // const resetAction = StackActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({ routeName: 'SliderInput' })],
            //   });
            // const didBlurSubscription = this.props.navigation.addListener(
            //     'didBlur',
            //     payload => {
            //         this.props.navigation.dispatch(resetAction);
            //     }
            //   );
        };

    render() {



        return (
            <View style={{flex: 1}}>

                <View style={{flex: 2, 
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: 'steelblue'
                }}>
                    <Text>Thanks!</Text>
                </View>

                <View style={{flex: 3, 
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: 'skyblue'
                }}>
                    <Text>"{this.state.randQuote}"</Text>
                    <Text>-- {this.state.randAuth}</Text>
                </View>

                <View style={{flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: 'skyblue'
                }}>
                    <Button
                    onPress={() => this.props.navigation.navigate('Profile')}
                    title='OK'
                    color='steelblue' 
                    />
                    <Button
                    onPress={() => this.props.navigation.navigate('Profile')}
                    title='Map'
                    color='steelblue' 
                    />
                </View>

            </View>
        );
    }
}
