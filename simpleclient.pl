use strict;
use warnings;

use JSON;
use IO::Socket;

my $socket = IO::Socket::INET->new(
    PeerHost => '127.0.0.1',
    PeerPort => '1337',
    Proto    => 'tcp',
) or
    die "cannot connect to the server $!\n";

print "connected to the server\n";
    my $client_socket = $socket->accept();
    my $msg = sprintf("%s:%d:%d",'sctnightcore',99,50);
    $socket->send($msg);
    print($msg);
    $socket->close();
    sleep(99);

