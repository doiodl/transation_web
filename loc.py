import fcntl
import sys

lock_filename = 'chat.txt'
lock_file = open(lock_filename, 'a')
k=1
while(k):
	try:
		fcntl.lockf(lock_file, fcntl.LOCK_EX | fcntl.LOCK_NB)
		k = 0
	except IOError:
		k = 1

print('Locked! Running code...')

quit = False
while quit is not True:
    quit = input('Press q to quit ')
    quit = str(quit) == 'q'

print('Bye!')
sys.exit(0)